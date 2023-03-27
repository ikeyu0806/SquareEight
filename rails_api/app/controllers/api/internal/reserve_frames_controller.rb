include Base64Image

class Api::Internal::ReserveFramesController < ApplicationController
  before_action :merchant_login_only!, except: [:show]

  def index
    # ページネーション
    current_page = params[:current_page].to_i
    display_count = params[:display_count].to_i
    reserve_frames = current_merchant_user.account.reserve_frames
    last_page, remainder = reserve_frames.count.divmod(display_count)
    last_page += 1 if remainder.positive?
    reserve_frames = reserve_frames.enabled
                     .order(:id)
                     .to_json(methods: [:payment_methods_text,
                                        :repeat_setting_text,
                                        :reception_type_text,
                                        :display_start_at,
                                        :display_end_at,
                                        :shops_name_with_public_id,
                                        :resources_name_with_public_id,
                                        :questionnaire_master_title_with_public_id,
                                        :reserve_frame_reception_times_values,
                                        :out_of_range_frames_dates,
                                        :unreservable_frames_dates,
                                        :reception_deadline_text,
                                        :cancel_reception_text])
    reserve_frames = JSON.parse(reserve_frames)
    reserve_frames = reserve_frames.first(current_page * display_count).last(display_count)
    render json: { status: 'success', reserve_frames: reserve_frames, last_page: last_page }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def show
    reserve_frame = ReserveFrame.enabled.find_by(public_id: params[:public_id])
    shared_component = reserve_frame.account.shared_component
    shared_component = JSON.parse(shared_component.to_json(methods: [:navbar_image_account_s3_image_public_url]))
    login_status = current_end_user.present? ? 'Logout' : 'Login'
    reserve_frame_json = JSON.parse(reserve_frame.to_json(methods: [:payment_methods,
                                                                    :resource_ids,
                                                                    :shop_ids,
                                                                    :start_date_input_value,
                                                                    :repeat_end_date_input_value,
                                                                    :monthly_payment_plan_ids,
                                                                    :reservable_frame_ticket_master,
                                                                    :reserve_frame_reception_times_values,
                                                                    :repeat_wdays,
                                                                    :out_of_range_frames_to_webform,
                                                                    :unreservable_frames_to_webform,
                                                                    :reserve_frame_local_payment_prices,
                                                                    :reserve_frame_credit_card_payment_prices,
                                                                    :local_payment_prices_with_number_of_people,
                                                                    :credit_card_payment_prices_with_number_of_people,
                                                                    :image1_account_s3_image_public_url,
                                                                    :image2_account_s3_image_public_url,
                                                                    :image3_account_s3_image_public_url,
                                                                    :image4_account_s3_image_public_url,
                                                                    :image5_account_s3_image_public_url,
                                                                    :display_staff,
                                                                    :display_equipment]))
    render json: {  status: 'success',
                    reserve_frame: reserve_frame_json,
                    login_status: login_status,
                    shared_component: shared_component }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      reserve_frame = current_merchant_user.account.reserve_frames
                      .new(form_type_attr_params)
      if form_type_params[:is_every_month_repeat] && form_type_params[:repeat_interval_type].eql?("Month")
        reserve_frame.repeat_interval_month_date = form_type_params[:start_at].to_date.day
      end
      form_type_params[:reserve_frame_reception_times].uniq.each do |reception_time|
        reserve_frame.reserve_frame_reception_times.new(reception_start_time: reception_time[:reception_start_time], reception_end_time: reception_time[:reception_end_time])
      end
      form_type_params[:out_of_range_frames].uniq.each do |frame|
        reserve_frame.out_of_range_frames.new(start_at: DateTime.parse(frame))
      end
      form_type_params[:unreservable_frames].uniq.each do |frame|
        reserve_frame.unreservable_frames.new(start_at: DateTime.parse(frame))
      end
      if form_type_params[:resource_ids].present?
        reserve_frame.reserve_frame_resources.delete_all
        form_type_params[:resource_ids].each do |resource_id|
          reserve_frame.reserve_frame_resources.new(resource_id: resource_id)
        end
      end
      reserve_frame.save!
      if form_type_params[:shop_ids].present?
        form_type_params[:shop_ids].each do |shop_id|
          reserve_frame.shop_reserve_frames.new(shop_id: shop_id)
        end
      end
      if reserve_frame.is_monthly_plan_payment_enable?
        form_type_params[:monthly_payment_plan_ids].each do |plan_id|
          reserve_frame.reserve_frame_monthly_payment_plans.new(monthly_payment_plan_id: plan_id)
        end
      end
      if reserve_frame.is_ticket_payment_enable?
        form_type_params[:reservable_frame_ticket_master].each do |ticket_master|
          reserve_frame.reserve_frame_ticket_masters.new(ticket_master)
        end
      end
      if params[:reserve_frame_image1_file].present? && !params[:reserve_frame_image1_file].eql?("null")
        file_name = "reserve_frame_image1_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image1_file], "image1_account_s3_image_id")
      end
      if params[:reserve_frame_image2_file].present? && !params[:reserve_frame_image2_file].eql?("null")
        file_name = "reserve_frame_image2_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image2_file], "image2_account_s3_image_id")
      end
      if params[:reserve_frame_image3_file].present? && !params[:reserve_frame_image3_file].eql?("null")
        file_name = "reserve_frame_image3_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image3_file], "image3_account_s3_image_id")
      end
      if params[:reserve_frame_image4_file].present? && !params[:reserve_frame_image4_file].eql?("null")
        file_name = "reserve_frame_image4_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image4_file], "image4_account_s3_image_id")
      end
      if params[:reserve_frame_image5_file].present? && !params[:reserve_frame_image5_file].eql?("null")
        file_name = "reserve_frame_image5_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image5_file], "image5_account_s3_image_id")
      end
      if form_type_params[:repeat_wdays].present?
        reserve_frame.is_repeat_sun = true if form_type_params[:repeat_wdays].include?("Sun")
        reserve_frame.is_repeat_mon = true if form_type_params[:repeat_wdays].include?("Mon")
        reserve_frame.is_repeat_tue = true if form_type_params[:repeat_wdays].include?("Tue")
        reserve_frame.is_repeat_wed = true if form_type_params[:repeat_wdays].include?("Wed")
        reserve_frame.is_repeat_thu = true if form_type_params[:repeat_wdays].include?("Thu")
        reserve_frame.is_repeat_fri = true if form_type_params[:repeat_wdays].include?("Fri")
        reserve_frame.is_repeat_sat = true if form_type_params[:repeat_wdays].include?("Sat")
      end
      if form_type_params[:apply_multi_local_payment_price]
        form_type_params[:multi_local_payment_prices].each do |local_payment|
          reserve_frame.reserve_frame_local_payment_prices.new(name: local_payment[:name], price: local_payment[:price])
        end
      end
      if form_type_params[:apply_multi_credit_card_payment_price]
        form_type_params[:multi_credit_card_payment_prices].each do |credit_card_payment|
          reserve_frame.reserve_frame_credit_card_payment_prices.new(name: credit_card_payment[:name], price: credit_card_payment[:price])
        end
      end
      reserve_frame.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      reserve_frame = ReserveFrame.find_by(public_id: params[:public_id])
      reserve_frame.attributes = form_type_attr_params
      if form_type_params[:is_every_month_repeat] && form_type_params[:repeat_interval_type].eql?("Month")
        reserve_frame.repeat_interval_month_date = form_type_params[:start_at].to_date.day
      end
      if form_type_params[:reserve_frame_reception_times].present?
        reserve_frame.reserve_frame_reception_times.delete_all
        form_type_params[:reserve_frame_reception_times].uniq.each do |reception_time|
          reserve_frame.reserve_frame_reception_times.new(reception_start_time: reception_time[:reception_start_time], reception_end_time: reception_time[:reception_end_time])
        end
      end
      reserve_frame.unreservable_frames.delete_all
        form_type_params[:unreservable_frames].uniq.each do |frame|
          reserve_frame.unreservable_frames.new(start_at: DateTime.parse(frame))
        end
      reserve_frame.out_of_range_frames.delete_all
      form_type_params[:out_of_range_frames].uniq.each do |frame|
        reserve_frame.out_of_range_frames.new(start_at: DateTime.parse(frame))
      end
      reserve_frame.reserve_frame_resources.delete_all
      form_type_params[:resource_ids].each do |resource_id|
        reserve_frame.reserve_frame_resources.new(resource_id: resource_id)
      end
      reserve_frame.save!
      reserve_frame.shop_reserve_frames.destroy_all
      form_type_params[:shop_ids].each do |shop_id|
        reserve_frame.shop_reserve_frames.new(shop_id: shop_id)
      end
      if reserve_frame.is_monthly_plan_payment_enable?
        reserve_frame.monthly_payment_plans.delete_all
        form_type_params[:monthly_payment_plan_ids].uniq.each do |plan_id|
          reserve_frame.reserve_frame_monthly_payment_plans.new(monthly_payment_plan_id: plan_id)
        end
      end
      if reserve_frame.is_ticket_payment_enable?
        reserve_frame.reserve_frame_ticket_masters.delete_all
        form_type_params[:reservable_frame_ticket_master].each do |ticket_master|
          reserve_frame.reserve_frame_ticket_masters.new(ticket_master)
        end
      end
      if params[:reserve_frame_image1_file].present? && !params[:reserve_frame_image1_file].eql?("null")
        file_name = "reserve_frame_image1_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image1_file], "image1_account_s3_image_id")
      end
      if params[:reserve_frame_image2_file].present? && !params[:reserve_frame_image2_file].eql?("null")
        file_name = "reserve_frame_image2_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image2_file], "image2_account_s3_image_id")
      end
      if params[:reserve_frame_image3_file].present? && !params[:reserve_frame_image3_file].eql?("null")
        file_name = "reserve_frame_image3_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image3_file], "image3_account_s3_image_id")
      end
      if params[:reserve_frame_image4_file].present? && !params[:reserve_frame_image4_file].eql?("null")
        file_name = "reserve_frame_image4_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image4_file], "image4_account_s3_image_id")
      end
      if params[:reserve_frame_image5_file].present? && !params[:reserve_frame_image5_file].eql?("null")
        file_name = "reserve_frame_image5_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.register_s3_image(file_name, params[:reserve_frame_image5_file], "image5_account_s3_image_id")
      end
      if form_type_params[:repeat_wdays].present?
        reserve_frame.is_repeat_sun = true if form_type_params[:repeat_wdays].include?("Sun")
        reserve_frame.is_repeat_mon = true if form_type_params[:repeat_wdays].include?("Mon")
        reserve_frame.is_repeat_tue = true if form_type_params[:repeat_wdays].include?("Tue")
        reserve_frame.is_repeat_wed = true if form_type_params[:repeat_wdays].include?("Wed")
        reserve_frame.is_repeat_thu = true if form_type_params[:repeat_wdays].include?("Thu")
        reserve_frame.is_repeat_fri = true if form_type_params[:repeat_wdays].include?("Fri")
        reserve_frame.is_repeat_sat = true if form_type_params[:repeat_wdays].include?("Sat")
      end
      reserve_frame.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def settable_relation_data
    account = current_merchant_user.account
    questionnaire_masters = account.questionnaire_masters.enabled
    resources = account.resources
    ticket_masters = account.ticket_masters.enabled
    monthly_payment_plans = account.monthly_payment_plans.enabled
    shops = account.shops
    render json: { status: 'success',
                   resources: resources,
                   questionnaire_masters: questionnaire_masters,
                   ticket_masters: ticket_masters,
                   monthly_payment_plans: monthly_payment_plans,
                   shops: shops }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  def logical_delete
    reserve_frame = ReserveFrame.find_by(public_id: params[:public_id])
    reserve_frame.logical_delete
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end

  private

  def form_type_params
    JSON.parse(params.require(:reserve_frame), {symbolize_names: true})[:reserve_frame]
  end

  def form_type_attr_params
    form_type_params.except(:unreservable_frames,
                            :out_of_range_frames,
                            :reserve_frame_reception_times,
                            :repeat_interval_number_month_date,
                            :shop_ids,
                            :resource_ids,
                            :monthly_payment_plan_ids,
                            :reservable_frame_ticket_master,
                            :base64_image,
                            :repeat_wdays,
                            :multi_local_payment_prices,
                            :multi_credit_card_payment_prices,
                            :apply_multi_local_payment_price,
                            :apply_multi_credit_card_payment_price)
  end
end
