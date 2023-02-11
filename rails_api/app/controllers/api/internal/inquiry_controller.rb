class Api::Internal::InquiryController < ApplicationController
  def send_confirm_mail
    InquiryMailer.send_confirm_mail(
      inquiry_params[:organization],
      inquiry_params[:email],
      inquiry_params[:phone_number],
      inquiry_params[:content],
      inquiry_params[:inquiry_type]).deliver_now
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def inquiry_params
    params.require(:inquiry)
          .permit(:id,
                  :organization,
                  :email,
                  :phone_number,
                  :content,
                  :inquiry_type)
  end
end
