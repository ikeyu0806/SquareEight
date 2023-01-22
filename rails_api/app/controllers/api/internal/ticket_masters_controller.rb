include Base64Image

class Api::Internal::TicketMastersController < ApplicationController
  before_action :merchant_login_only!, except: [:show, :purchase_info, :purchase, :insert_cart]

  def index
    ticket_masters = current_merchant_user.account.ticket_masters.enabled.order(:id)
    render json: { status: 'success', ticket_masters: ticket_masters }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    ticket_master = TicketMaster.find_by(public_id: params[:public_id])
    ticket_master = JSON.parse(ticket_master.to_json(methods: [:selected_shop_ids, :image1_account_s3_image_public_url]))
    render json: { status: 'success', ticket_master: ticket_master }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def purchase_info
    ticket_master = TicketMaster.find_by(public_id: params[:public_id])
    main_image_public_url = ticket_master.main_image_public_url
    shared_component = ticket_master.account.shared_component
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      login_status = 'Logout'
    end
    render json: { status: 'success',
                   shared_component: shared_component,
                   main_image_public_url: main_image_public_url,
                   ticket_master: ticket_master,
                   payment_methods: payment_methods,
                   default_payment_method_id: default_payment_method_id,
                   login_status: login_status }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      ticket_master = current_merchant_user.account.ticket_masters.new(ticket_master_params.except(:base64_image, :shops))
      if ticket_master_params[:base64_image].present?
        file_name = "ticket_master_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        account_image = AccountS3Image.new
        account_image.account = current_merchant_user.account
        account_image.image1_account_s3_image_public_url = put_s3_http_request_base64_data(ticket_master_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        account_image.s3_object_name = file_name
        account_image.save!
        ticket_master.image1_account_s3_image_id = account_image.id
      end
      ticket_master.save!
      ticket_master_params[:shops].each do |s|
        shop = Shop.find_by(public_id: s[:public_id])
        ticket_master.shop_ticket_masters.create!(shop_id: shop.id)
      end
      ticket_master.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      ticket_master = TicketMaster.find_by(public_id: params[:public_id])
      ticket_master.attributes = (ticket_master_params.except(:base64_image, :shops))
      if (ticket_master_params[:base64_image].present?)
        file_name = "ticket_master_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        account_image = AccountS3Image.new
        account_image.account = current_merchant_user.account
        account_image.image1_account_s3_image_public_url = put_s3_http_request_base64_data(ticket_master_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        account_image.s3_object_name = file_name
        account_image.save!
        ticket_master.image1_account_s3_image_id = account_image.id
      end
      ticket_master.save!
      ticket_master.shop_ticket_masters.delete_all
      ticket_master_params[:shops].each do |s|
        shop = Shop.find_by(public_id: s[:public_id])
        ticket_master.shop_ticket_masters.create!(shop_id: shop.id)
      end
      ticket_master.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def insert_cart
    ActiveRecord::Base.transaction do
      ticket_master = TicketMaster.find_by(public_id: ticket_master_params[:public_id])
      ticket_master.cart_ticket_masters.create!(
        end_user_id: current_end_user.id,
        account_id: ticket_master.account_id,
        quantity: ticket_master_params[:purchase_quantity])
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def logical_delete
    ticket_master = TicketMaster.find_by(public_id: params[:public_id])
    ticket_master.logical_delete
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def ticket_master_params
    params.require(:ticket_master)
          .permit(:id,
                  :public_id,
                  :name,
                  :issue_number,
                  :price,
                  :effective_month,
                  :description,
                  :publish_status,
                  :base64_image,
                  :purchase_quantity,
                  shops: [:name, :public_id])
  end
end
