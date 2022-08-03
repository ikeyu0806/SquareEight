class Api::Internal::PurchasedTicketsController < ApplicationController
  before_action :end_user_login_only!

  def index
    purchased_tickets = JSON.parse(current_end_user.purchased_tickets.to_json(methods: [:name, :display_expired_at, :ticket_master_id]))
    render json: { statue: 'success', purchased_tickets: purchased_tickets }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
