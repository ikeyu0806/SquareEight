class StripeWebhooksController < ApplicationController
  def index
    stripe_params = JSON.parse(params.to_json)
    if stripe_params["type"] == "payment_intent.created"
      stripe_customer_id = stripe_params["data"]["object"]["customer"]
      stripe_payment_intent_id = stripe_params["data"]["object"]["id"]
      product_name = stripe_params["data"]["object"]["metadata"]["name"]
      amount = stripe_params["data"]["object"]["amount"]
      application_fee_amount = stripe_params["data"]["object"]["application_fee_amount"]
      transfer_destination_account_id = stripe_params["data"]["object"]["transfer_data"]["destination"]
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
      # DBに登録
      StripePaymentIntent.create!(
        amount: amount,
        stripe_payment_intent_id: stripe_payment_intent_id,
        stripe_customer_id: stripe_customer_id,
        application_fee_amount: application_fee_amount,
        order_date: order_date,
        transfer_destination_account_id: transfer_destination_account_id,
        ticket_master_id: ticket_master_id,
        product_id: product_id,
        reserve_frame_id: reserve_frame_id,
        system_product_type: system_product_type,
        end_user_id: end_user.id,
        account_id: account.id
      )
    end

    # 月額課金確定時。PaymentIntentで登録されていなかったデータを登録
    if stripe_params["type"] == "invoice.finalized"
      stripe_customer_id = stripe_params["data"]["object"]["customer"]
      stripe_payment_intent_id = stripe_params["data"]["object"]["payment_intent"]
      stripe_payment_intent = StripePaymentIntent.find_by(stripe_payment_intent_id: stripe_payment_intent_id)
      monthly_payment_plan_id = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["monthly_payment_plan_id"]
      stripe_payment_intent.monthly_payment_plan_id = monthly_payment_plan_id
      stripe_payment_intent.purchase_product_name = stripe_params["data"]["object"]["lines"]["data"][0]["metadata"]["purchase_product_name"]
      stripe_payment_intent.system_product_type = "MonthlyPaymentPlan" if monthly_payment_plan_id.present?
    end
  
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
