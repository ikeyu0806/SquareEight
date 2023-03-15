class Api::Internal::PurchasedTicketsController < ApplicationController
  before_action :end_user_login_only!

  def index
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    purchased_tickets = current_end_user.purchased_tickets
    last_page, remainder = purchased_tickets.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    purchased_tickets = JSON.parse(purchased_tickets.first(current_page * display_count).last(display_count).to_json(methods: [:name, :display_expired_at, :is_expired]))
    render json: { status: 'success', purchased_tickets: purchased_tickets, last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    purchased_ticket = JSON.parse(PurchasedTicket.find_by(public_id: params[:public_id]).to_json(methods: [:name, :display_expired_at]))
    render json: { status: 'success', purchased_ticket: purchased_ticket }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
