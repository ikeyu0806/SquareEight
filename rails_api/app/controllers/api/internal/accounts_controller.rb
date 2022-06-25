class Api::Internal::AccountsController < ApplicationController
  before_action :login_only!

  def payment_methods
    customer = Stripe::Customer.retrieve(current_merchant_user.account.stripe_customer_id)
    default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
    payment_methods = Stripe::Customer.list_payment_methods(
      current_merchant_user.account.stripe_customer_id,
      {type: 'card'},
    )
    payment_methods = payment_methods["data"].map{ |data| JSON.parse(data.to_json) }
    render json: { status: 'success',
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_credit_card
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    ActiveRecord::Base.transaction do
      account = current_merchant_user.account
      if account.stripe_customer_id.blank?
        customer = Stripe::Customer.create({
          source: account_params[:card_token],
        })
        account.update!(stripe_customer_id: customer.id)
        Stripe::PaymentMethod.attach(
          account_params[:payment_method_id],
          {customer: account.stripe_customer_id},
        )
        Stripe::Customer.update(
          account.stripe_customer_id,
          invoice_settings: {
            default_payment_method: account_params[:payment_method_id],
          },
        )
      else
        Stripe::PaymentMethod.attach(
          account_params[:payment_method_id],
          {customer: account.stripe_customer_id},
        )
      end
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def register_stripe_connected_account
    Stripe.api_key = Rails.configuration.stripe[:secret_key]
    stripe_account = Stripe::Account.create({
      type: 'custom',
      country: 'JP',
      capabilities: {
        card_payments: {requested: true},
        transfers: {requested: true},
      },
    })
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def account_params
    params.require(:account).permit(:id, :token, :payment_method_id)
  end
end
