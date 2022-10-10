class Api::Internal::InquiryController < ApplicationController
  def send_mail_to_admin
    InquiryMailer.send_mail_to_admin(inquiry_params[:email], inquiry_params[:content]).deliver_later
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def inquiry_params
    params.require(:inquiry).permit(:id, :email, :content)
  end
end
