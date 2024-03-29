class StripeWebhooksController < ApplicationController
  def index
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    Stripe.api_version = '2022-08-01'
    ActiveRecord::Base.transaction do
      stripe_params = JSON.parse(params.to_json)
      if stripe_params["type"] == "account.updated"
        account = Account.find_by(stripe_account_id: stripe_params["data"]["object"]["id"])
        if stripe_params["data"]["object"]["payouts_enabled"] == true
          # ビジネスオーナー向け  
          account_notification_title = "Stripeへの決済有効申請が承認されました。"
          account_notification_url = '/admin/sales_transfer'
          account.account_notifications
          .create!(title: account_notification_title, url: account_notification_url)
        else
          account_notification_title = "Stripeへの決済有効申請がまだ完了しておりません。追加必要項目を確認してください"
          account_notification_url = '/admin/sales_transfer'
          account.account_notifications
          .create!(title: account_notification_title, url: account_notification_url)
        end
        email = account.merchant_users.pluck(:email).join(",")
        StripeWebhookMailer.account_update_mail(email, account.id, stripe_params["data"]["object"]["payouts_enabled"]).deliver_now
      end
      # 決済実行時
      if stripe_params["type"] == "payment_intent.created"
        stripe_customer_id = stripe_params["data"]["object"]["customer"]
        stripe_payment_intent_id = stripe_params["data"]["object"]["id"]
        product_name = stripe_params["data"]["object"]["metadata"]["name"]
        amount = stripe_params["data"]["object"]["amount"]
        application_fee_amount = stripe_params["data"]["object"]["application_fee_amount"]
        if stripe_params["data"]["object"]["transfer_data"].present?
          transfer_destination_account_id = stripe_params["data"]["object"]["transfer_data"]["destination"]
        end
        order_item_id = stripe_params["data"]["object"]["metadata"]["order_item_id"]
        product_id = stripe_params["data"]["object"]["metadata"]["product_id"]
        ticket_master_id = stripe_params["data"]["object"]["metadata"]["ticket_master_id"]
        reserve_frame_id = stripe_params["data"]["object"]["metadata"]["reserve_frame_id"]
        payment_request_id = stripe_params["data"]["object"]["metadata"]["payment_request_id"]
        merchant_stripe_subscription_id = stripe_params["data"]["object"]["metadata"]["merchant_stripe_subscription_id"]
        system_stripe_subscription_id = stripe_params["data"]["object"]["metadata"]["system_stripe_subscription_id"]
        end_user = EndUser.find_by(stripe_customer_id: stripe_customer_id)
        account = Account.find_by(stripe_account_id: transfer_destination_account_id)
        stripe_payment_intent = StripePaymentIntent.find_or_initialize_by(stripe_payment_intent_id: stripe_payment_intent_id)
        if stripe_payment_intent.system_product_type.blank?
          system_product_type = 'Product' if product_id.present?
          system_product_type = 'TicketMaster' if ticket_master_id.present?
          system_product_type = 'Reservation' if reserve_frame_id.present?
          system_product_type = 'PaymentRequest' if payment_request_id.present?
        else
          system_product_type = stripe_payment_intent.system_product_type
        end
        purchase_product_name = stripe_params["data"]["object"]["metadata"]["purchase_product_name"]
        account_id = stripe_payment_intent.account_id.present? ? stripe_payment_intent.account_id : account&.id
        # システムプラン請求時の分岐
        if system_product_type.blank?
          system_product_type = 'SystemPlan' if stripe_params["data"]["object"]["metadata"]["product_type"].eql?('system_plan')
        end
        if system_product_type == 'SystemPlan' && stripe_params["data"]["object"]["metadata"]["account_id"].present?
          account_id = stripe_params["data"]["object"]["metadata"]["account_id"].to_i
        end
        if stripe_params["data"]["object"]["metadata"]["system_plan_name"].present?
          system_plan_name = stripe_params["data"]["object"]["metadata"]["system_plan_name"]
        else
          system_plan_name = ""
        end
        order_date = stripe_payment_intent.order_date.present? ? stripe_payment_intent.order_date : current_date_text
        # DBに登録
        stripe_payment_intent.attributes = {
          amount: amount,
          stripe_customer_id: stripe_customer_id,
          application_fee_amount: application_fee_amount,
          order_item_id: order_item_id,
          order_date: order_date,
          transfer_destination_account_id: transfer_destination_account_id,
          ticket_master_id: ticket_master_id,
          product_id: product_id,
          purchase_product_name: purchase_product_name,
          reserve_frame_id: reserve_frame_id,
          payment_request_id: payment_request_id,
          system_product_type: system_product_type,
          end_user_id: end_user&.id,
          account_id: account_id,
          merchant_stripe_subscription_id: merchant_stripe_subscription_id,
          system_stripe_subscription_id: system_stripe_subscription_id,
          system_plan_name: system_plan_name
        }
        stripe_payment_intent.save!
      end
  
      # invoice確定時。PaymentIntentで登録されていなかったデータを登録
      # if stripe_params["type"] == "invoice.finalized" && stripe_params["data"]["object"]["payment_intent"].present?
      #   stripe_customer_id = stripe_params["data"]["object"]["customer"]
      #   stripe_payment_intent_id = stripe_params["data"]["object"]["payment_intent"]
      #   stripe_payment_intent = StripePaymentIntent.find_or_initialize_by(stripe_payment_intent_id: stripe_payment_intent_id)
      #   monthly_payment_plan_id = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["monthly_payment_plan_id"]
      #   if stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["system_plan_name"].present?
      #     stripe_payment_intent.system_plan_name = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["system_plan_name"]
      #   end
      #   stripe_customer_id = stripe_params["data"]["object"]["customer"]
      #   stripe_payment_intent.monthly_payment_plan_id = monthly_payment_plan_id
      #   stripe_payment_intent.purchase_product_name = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["purchase_product_name"]
      #   stripe_payment_intent.system_product_type = "MonthlyPaymentPlan" if monthly_payment_plan_id.present?
      #   stripe_payment_intent.amount = stripe_params["data"]["object"]["lines"]["data"][0]["amount"]
      #   stripe_payment_intent.stripe_customer_id = stripe_customer_id
      #   stripe_payment_intent.order_date = stripe_payment_intent.order_date.present? ? stripe_payment_intent.order_date : current_date_text
      #   if stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["account_id"].present? && stripe_payment_intent.account_id.blank?
      #     stripe_payment_intent.account_id = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["account_id"]
      #   end
      #   if stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["product_type"] == "system_plan"
      #     stripe_payment_intent.system_product_type = "SystemPlan"
      #   end
      #   stripe_payment_intent.save!
      # end
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
