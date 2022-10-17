class Api::Internal::PaymentRequestsController < ApplicationController
  before_action :merchant_login_only!

  def init_stat
    account = current_merchant_user.account
    customers = account.customers
    customer_groups = account.customer_groups
    message_templates = account.message_templates
    render json: {  status: 'success',
                    customers: customers,
                    customer_groups: customer_groups,
                    message_templates: message_templates }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
