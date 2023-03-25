class Api::Internal::CustomerInquiryController < ApplicationController
  def send_confirm_mail
    CustomerInquiryMailer.send_confirm_mail(
      customer_inquiry_params[:email],
      customer_inquiry_params[:phone_number],
      customer_inquiry_params[:content],
      customer_inquiry_params[:inquiry_type]).deliver_now
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def customer_inquiry_params
    params.require(:customer_inquiry)
          .permit(:id,
                  :email,
                  :phone_number,
                  :content,
                  :inquiry_type)
  end
end
