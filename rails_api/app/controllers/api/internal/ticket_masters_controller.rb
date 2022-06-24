class Api::Internal::TicketMastersController < ApplicationController
  before_action :login_only!

  def create
    current_merchant_user.account.ticket_masters.create!(ticket_master_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def ticket_master_params
    params.require(:ticket_master).permit(:id, :name, :issue_number, :price)
  end
end
