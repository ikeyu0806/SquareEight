include Base64Image

class Api::Internal::TicketMastersController < ApplicationController
  before_action :merchant_login_only!, except: [:index, :show, :purchase_info, :purchase, :insert_cart]

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

  def purchase_info
    ticket_master = TicketMaster.find(params[:id])
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      login_status = 'Logout'
    end
    render json: { status: 'success',
                   ticket_master: ticket_master,
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id,
                   login_status: login_status }, states: 200
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

  def insert_cart
    ActiveRecord::Base.transaction do
      ticket_master = TicketMaster.find(ticket_master_params[:id])
      ticket_master.cart_ticket_masters.create!(
        end_user_id: current_end_user.id,
        account_id: ticket_master.account_id,
        quantity: ticket_master_params[:purchase_quantity])
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def ticket_master_params
    params.require(:ticket_master)
          .permit(:id,
                  :name,
                  :issue_number,
                  :price,
                  :effective_month,
                  :description,
                  :base64_image,
                  :purchase_quantity)
  end
end
