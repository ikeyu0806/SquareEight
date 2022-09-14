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
      order_date = stripe_params["data"]["object"]["metadata"]["order_date"]
      system_product_type = ''
      system_product_type = 'Product' if product_id.present?
      system_product_type = 'TicketMaster' if ticket_master_id.present?

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
        system_product_type: system_product_type,
        end_user_id: end_user.id,
        account_id: account.id
      )
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
