include Base64Image

class Api::Internal::TicketMastersController < ApplicationController
  before_action :merchant_login_only!, except: [:show, :purchase_info, :purchase, :insert_cart]

  def index
    ticket_masters = current_merchant_user.account.ticket_masters.enabled.order(:id)
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    last_page, remainder = ticket_masters.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    ticket_masters = ticket_masters.first(current_page * display_count).last(display_count)
    render json: { status: 'success', ticket_masters: ticket_masters, last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    ticket_master = TicketMaster.find_by(public_id: params[:public_id])
    account = ticket_master.account
    ticket_master = JSON.parse(ticket_master.to_json(methods: [
      :selected_shop_ids,
      :selected_reserve_frame_ids,
      :image1_account_s3_image_public_url,
      :image2_account_s3_image_public_url,
      :image3_account_s3_image_public_url,
      :image4_account_s3_image_public_url,
      :image5_account_s3_image_public_url,
    ]))
    selectable_reserve_frames = account.reserve_frames.enabled
    render json: { status: 'success',
                   selectable_reserve_frames: selectable_reserve_frames,
                   ticket_master: ticket_master }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def related_data
    account = current_merchant_user.account
    selectable_reserve_frames = account.reserve_frames.enabled
    render json: { status: 'success',
                   selectable_reserve_frames: selectable_reserve_frames }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def purchase_info
    ticket_master = TicketMaster.find_by(public_id: params[:public_id])
    image1_account_s3_image_public_url = ticket_master.image1_account_s3_image_public_url
    shared_component = ticket_master.account.shared_component
    if current_end_user.present?
      default_payment_method_id, payment_methods = current_end_user.payment_methods
      login_status = 'Login'
    else
      default_payment_method_id = nil
      payment_methods = []
      login_status = 'Logout'
    end
    ticket_master = JSON.parse(ticket_master.to_json(
      methods: [
        :image1_account_s3_image_public_url,
        :image2_account_s3_image_public_url,
        :image3_account_s3_image_public_url,
        :image4_account_s3_image_public_url,
        :image5_account_s3_image_public_url,]))
    shared_component = JSON.parse(shared_component.to_json(methods: [:navbar_image_account_s3_image_public_url]))
    render json: { status: 'success',
                   shared_component: shared_component,
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
      ticket_master = current_merchant_user.account.ticket_masters.new(form_type_params.except(:shops))
      if params[:ticket_master_image1_file].present? && !params[:ticket_master_image1_file].eql?("null")
        file_name = "ticket_master_image1_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image1_file], "image1_account_s3_image_id")
      end
      if params[:ticket_master_image2_file].present? && !params[:ticket_master_image2_file].eql?("null")
        file_name = "ticket_master_image2_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image2_file], "image2_account_s3_image_id")
      end
      if params[:ticket_master_image3_file].present? && !params[:ticket_master_image3_file].eql?("null")
        file_name = "ticket_master_image3_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image3_file], "image3_account_s3_image_id")
      end
      if params[:ticket_master_image4_file].present? && !params[:ticket_master_image4_file].eql?("null")
        file_name = "ticket_master_image4_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image4_file], "image4_account_s3_image_id")
      end
      if params[:ticket_master_image5_file].present? && !params[:ticket_master_image5_file].eql?("null")
        file_name = "ticket_master_image5_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image5_file], "image5_account_s3_image_id")
      end
      if params["reserve_frame_ids"].present?
        params["reserve_frame_ids"].each do |reserve_frame_id|
          ticket_master.reserve_frame_ticket_masters.create!(reserve_frame_id: reserve_frame_id)
        end
      end
      ticket_master.save!
      form_type_params[:shops].each do |s|
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
      ticket_master.attributes = (form_type_params.except(:shops))
      if params[:ticket_master_image1_file].present? && !params[:ticket_master_image1_file].eql?("null")
        file_name = "ticket_master_image1_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image1_file], "image1_account_s3_image_id")
      end
      if params[:ticket_master_image2_file].present? && !params[:ticket_master_image2_file].eql?("null")
        file_name = "ticket_master_image2_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image2_file], "image2_account_s3_image_id")
      end
      if params[:ticket_master_image3_file].present? && !params[:ticket_master_image3_file].eql?("null")
        file_name = "ticket_master_image3_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image3_file], "image3_account_s3_image_id")
      end
      if params[:ticket_master_image4_file].present? && !params[:ticket_master_image4_file].eql?("null")
        file_name = "ticket_master_image4_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image4_file], "image4_account_s3_image_id")
      end
      if params[:ticket_master_image5_file].present? && !params[:ticket_master_image5_file].eql?("null")
        file_name = "ticket_master_image5_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        ticket_master.register_s3_image(file_name, params[:ticket_master_image5_file], "image5_account_s3_image_id")
      end
      ticket_master.reserve_frame_ticket_masters.destroy_all
      if params["reserve_frame_ids"].present?
        params["reserve_frame_ids"].each do |reserve_frame_id|
          ticket_master.reserve_frame_ticket_masters.create!(reserve_frame_id: reserve_frame_id)
        end
      end
      ticket_master.shop_ticket_masters.destroy_all
      ticket_master.save!
      form_type_params[:shops].each do |s|
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
      ticket_master = TicketMaster.find_by(public_id: json_type_params[:public_id])
      ticket_master.cart_ticket_masters.create!(
        end_user_id: current_end_user.id,
        account_id: ticket_master.account_id,
        quantity: json_type_params[:purchase_quantity])
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

  def form_type_params
    JSON.parse(params.require(:ticket_master), {symbolize_names: true})[:ticket_master]
  end

  def json_type_params
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
