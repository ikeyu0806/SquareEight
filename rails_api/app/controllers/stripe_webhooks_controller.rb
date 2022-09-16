class StripeWebhooksController < ApplicationController
  def index
    ActiveRecord::Base.transaction do
      stripe_params = JSON.parse(params.to_json)
      if stripe_params["type"] == "payment_intent.created"
        stripe_customer_id = stripe_params["data"]["object"]["customer"]
        stripe_payment_intent_id = stripe_params["data"]["object"]["id"]
        product_name = stripe_params["data"]["object"]["metadata"]["name"]
        amount = stripe_params["data"]["object"]["amount"]
        application_fee_amount = stripe_params["data"]["object"]["application_fee_amount"]
        if stripe_params["data"]["object"]["transfer_data"].present?
          transfer_destination_account_id = stripe_params["data"]["object"]["transfer_data"]["destination"]
        end
        product_id = stripe_params["data"]["object"]["metadata"]["product_id"]
        ticket_master_id = stripe_params["data"]["object"]["metadata"]["ticket_master_id"]
        reserve_frame_id = stripe_params["data"]["object"]["metadata"]["reserve_frame_id"]
        order_date = current_date_text
        system_product_type = ''
        system_product_type = 'Product' if product_id.present?
        system_product_type = 'TicketMaster' if ticket_master_id.present?
        system_product_type = 'Reservation' if reserve_frame_id.present?
  
        end_user = EndUser.find_by(stripe_customer_id: stripe_customer_id)
        account = Account.find_by(stripe_account_id: transfer_destination_account_id)
        stripe_payment_intent = StripePaymentIntent.find_or_initialize_by(stripe_payment_intent_id: stripe_payment_intent_id)
  
        # DBに登録
        stripe_payment_intent.attributes = {
          amount: amount,
          stripe_customer_id: stripe_customer_id,
          application_fee_amount: application_fee_amount,
          order_date: order_date,
          transfer_destination_account_id: transfer_destination_account_id,
          ticket_master_id: ticket_master_id,
          product_id: product_id,
          reserve_frame_id: reserve_frame_id,
          system_product_type: system_product_type,
          end_user_id: end_user&.id,
          account_id: account&.id
        }
        stripe_payment_intent.save!
      end
  
      # invoice確定時。PaymentIntentで登録されていなかったデータを登録
      if stripe_params["type"] == "invoice.finalized"
        stripe_customer_id = stripe_params["data"]["object"]["customer"]
        stripe_payment_intent_id = stripe_params["data"]["object"]["payment_intent"]
        stripe_payment_intent = StripePaymentIntent.find_or_initialize_by(stripe_payment_intent_id: stripe_payment_intent_id)
        monthly_payment_plan_id = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["monthly_payment_plan_id"]
        if stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["product_type"] == "system_plan"
          stripe_payment_intent.system_product_type = "SyetemPlan"
        end
        if stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["system_plan_name"].present?
          stripe_payment_intent.system_plan_name = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["system_plan_name"]
        end
        stripe_customer_id = stripe_params["data"]["object"]["customer"]
        stripe_payment_intent.monthly_payment_plan_id = monthly_payment_plan_id
        stripe_payment_intent.purchase_product_name = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["purchase_product_name"]
        stripe_payment_intent.system_product_type = "MonthlyPaymentPlan" if monthly_payment_plan_id.present?
        stripe_payment_intent.amount = stripe_params["data"]["object"]["lines"]["data"][0]["amount"]
        stripe_payment_intent.stripe_customer_id = stripe_customer_id
        if stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["account_id"].present?
          stripe_payment_intent.account_id = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["account_id"]
        end
        stripe_payment_intent.save!
      end
    
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
