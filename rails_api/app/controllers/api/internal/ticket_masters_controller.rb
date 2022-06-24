class Api::Internal::TicketMastersController < ApplicationController
  before_action :login_only!

  def index
    ticket_masters = current_merchant_user.account.ticket_masters.order(:id)
    render json: { status: 'success', ticket_masters: ticket_masters }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def edit
    ticket_master = TicketMaster.find(params[:id])
    render json: { status: 'success', ticket_master: ticket_master }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    current_merchant_user.account.ticket_masters.create!(ticket_master_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ticket_master = TicketMaster.find(params[:id])
    ticket_master.update!(ticket_master_params)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def ticket_master_params
    params.require(:ticket_master).permit(:id, :name, :issue_number, :price)
  end
end
