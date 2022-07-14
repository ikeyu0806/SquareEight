class Api::Internal::CustomersController < ApplicationController
  before_action :login_only!

  def create
    Customer.create!(customer_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def customer_params
    params.require(:customers)
          .permit(:id,
                  :first_name,
                  :last_name,
                  :first_name_kana,
                  :email,
                  :phone_number,
                  :postal_code,
                  :state,
                  :city,
                  :town,
                  :line1,
                  :line2,
                  :state_kana,
                  :city_kana,
                  :town_kana,
                  :line1_kana,
                  :line2_kana,
                  :gender,
                  :custom_items_answer)
  end
end
