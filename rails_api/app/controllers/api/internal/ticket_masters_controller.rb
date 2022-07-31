include Base64Image

class Api::Internal::TicketMastersController < ApplicationController
  before_action :merchant_login_only!, except: [:index, :show, :purchase]
  before_action :end_user_login_only!, only: :purchase

  def index
    ticket_masters = current_merchant_user.account.ticket_masters.order(:id)
    render json: { status: 'success', ticket_masters: ticket_masters }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    ticket_master = TicketMaster.find(params[:id])
    render json: { status: 'success', ticket_master: ticket_master }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      ticket_master = current_merchant_user.account.ticket_masters.new(ticket_master_params.except(:base64_image))
      if ticket_master_params[:base64_image].present?
        file_name = "ticket_master_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.s3_object_public_url = put_s3_http_request_data(ticket_master_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        ticket_master.s3_object_name = file_name
      end
      ticket_master.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      ticket_master = TicketMaster.find(params[:id])
      ticket_master.attributes = (ticket_master_params.except(:base64_image))
      if (ticket_master_params[:base64_image].present?)
        ticket_master.delete_s3_image if ticket_master.s3_object_public_url.present?
        file_name = "ticket_master_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.s3_object_public_url = put_s3_http_request_data(ticket_master_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        ticket_master.s3_object_name = file_name
      end
      ticket_master.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def purchase
    ActiveRecord::Base.transaction do
      ticket_master = TicketMaster.find(ticket_master_params[:id])
      customer = Stripe::Customer.retrieve(current_end_user.stripe_customer_id)
      default_payment_method_id = customer["invoice_settings"]["default_payment_method"]
      commission = (ticket_master.price * 0.04).to_i
      Stripe.api_key = Rails.configuration.stripe[:secret_key]
      payment_intent = Stripe::PaymentIntent.create({
        amount: ticket_master.price,
        currency: 'jpy',
        payment_method_types: ['card'],
        payment_method: default_payment_method_id,
        customer: current_end_user.stripe_customer_id,
        application_fee_amount: commission,
        transfer_data:  {
          destination: ticket_master.account.stripe_account_id
        }
      })
      Stripe::PaymentIntent.confirm(
        payment_intent.id
      )
      order = current_end_user.orders.new(account_id: ticket_master.account_id)
      order.order_items.new(product_type: 'TicketMaster',
                            ticket_master_id: ticket_master.id,
                            product_name: ticket_master.name,
                            price: ticket_master.price,
                            commission: commission)
      order.save!
      purchased_ticket = current_end_user
                         .purchased_tickets
                         .new(ticket_master_id: ticket_master.id,
                              remain_number: ticket_master.issue_number)
      purchased_ticket.save!
      render json: { status: 'success', order_id: order.id }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def ticket_master_params
    params.require(:ticket_master).permit(:id, :name, :issue_number, :price, :description, :base64_image)
  end
end
