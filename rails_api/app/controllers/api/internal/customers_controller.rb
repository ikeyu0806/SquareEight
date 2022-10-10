class Api::Internal::CustomersController < ApplicationController
  before_action :merchant_login_only!

  def create
    Customer.create!(customer_params)
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def questionnaire_answers
    customer = Customer.find(params[:customer_id])
    answer_contents = customer.answer_contents
    render json: { status: 'success', answer_contents: answer_contents }, status: 200
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
                  :gender,
                  :dob,
                  :notes,
                  :custom_items_answer)
  end
end
