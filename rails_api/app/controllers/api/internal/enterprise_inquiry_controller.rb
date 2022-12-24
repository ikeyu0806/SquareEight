class Api::Internal::EnterpriseInquiryController < ApplicationController
  def send_mail_to_admin
    EnterpriseInquiryMailer.send_mail_to_admin(
      enterprise_inquiry_params[:name],
      enterprise_inquiry_params[:email],
      enterprise_inquiry_params[:business_name],
      enterprise_inquiry_params[:content]).deliver_now
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def enterprise_inquiry_params
    params.require(:enterprise_inquiry).permit(:id, :name, :email, :business_name, :content)
  end
end
