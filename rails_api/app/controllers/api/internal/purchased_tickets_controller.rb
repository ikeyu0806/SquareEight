class Api::Internal::PurchasedTicketsController < ApplicationController
  before_action :end_user_login_only!

  def index
    purchased_tickets = JSON.parse(current_end_user.purchased_tickets.to_json(methods: [:name, :display_expired_at, :is_expired]))
    render json: { statue: 'success', purchased_tickets: purchased_tickets }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    purchased_ticket = JSON.parse(PurchasedTicket.find_by(public_id: params[:id]).to_json(methods: [:name, :display_expired_at]))
    render json: { statue: 'success', purchased_ticket: purchased_ticket }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
