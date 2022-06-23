class Api::Internal::AccountsController < ApplicationController
  before_action :login_only!

  def register_credit_card
    ActiveRecord::Base.transaction do
      account = current_merchant_user.account
      if account.stripe_customer_id.blank?
        Stripe.api_key = Rails.configuration.stripe[:secret_key]
        customer = Stripe::Customer.create({
          source: account_params[:card_token],
        })
        account.update!(stripe_customer_id: customer.id)
      end
      selected = account.payment_methods.count.positive? ? false : true
      account.payment_methods.create!(stripe_card_id: account_params[:card_id],
                                      payment_type: :stripeCard,
                                      selected: selected)
  
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def account_params
    params.require(:account).permit(:id, :token, :card_id)
  end
end
