class Api::Batch::MerchantSubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def exec_payment
  end
end
