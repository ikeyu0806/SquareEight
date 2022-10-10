include Base64Image

class Api::Internal::ReserveFramesController < ApplicationController
  before_action :merchant_login_only!, except: [:reserve_events, :show]

  def index
    reserve_frames = current_merchant_user.account.reserve_frames.enabled.order(:id)
                     .order(:id)
                     .to_json(methods: [:payment_methods_text, :repeat_setting_text, :reception_type_text, :display_start_at, :display_end_at])
    reserve_frames = JSON.parse(reserve_frames)
    render json: { status: 'success', reserve_frames: reserve_frames }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    # reduxのデフォルト0にして無駄なリクエスト来るんで一旦こうしとく
    render json: { status: 'success' } and return if params[:id].to_i.zero?
    reserve_frame = ReserveFrame.enabled.find(params[:id])
    shared_component = reserve_frame.account.shared_component
    reserve_frame_json = JSON.parse(reserve_frame.to_json(methods: [:payment_methods,
                                                                    :resource_ids,
                                                                    :start_date_input_value,
                                                                    :repeat_end_date_input_value,
                                                                    :monthly_payment_plan_ids,
                                                                    :reservable_frame_ticket_master,
                                                                    :reserve_frame_reception_times_values,
                                                                    :repeat_wdays,
                                                                    :out_of_range_frames_datetimes,
                                                                    :unreservable_frames_datetimes,
                                                                    :reserve_frame_local_payment_prices,
                                                                    :reserve_frame_credit_card_payment_prices,
                                                                    :local_payment_prices_with_number_of_people,
                                                                    :credit_card_payment_prices_with_number_of_people]))
    render json: { status: 'success', reserve_frame: reserve_frame_json, shared_component: shared_component }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      reserve_frame = current_merchant_user.account.reserve_frames
                      .new(reserve_frame_instance_attribute_params)                   
      reserve_frame_params[:reserve_frame_reception_times].each do |reception_time|
        reserve_frame.reserve_frame_reception_times.new(reception_start_time: reception_time[:reception_start_time], reception_end_time: reception_time[:reception_end_time])
      end
      reserve_frame_params[:out_of_range_frames].each do |frame|
        reserve_frame.out_of_range_frames.new(start_at: frame[:start_at], end_at: frame[:end_at])
      end
      reserve_frame_params[:unreservable_frames].each do |frame|
        reserve_frame.unreservable_frames.new(start_at: frame[:start_at], end_at: frame[:end_at])
      end
      if reserve_frame_params[:resource_ids].present?
        reserve_frame.reserve_frame_resorces.delete_all
        reserve_frame_params[:resource_ids].each do |resource_id|
          reserve_frame.reserve_frame_resorces.new(resource_id: resource_id)
        end
      end
      if reserve_frame.is_monthly_plan_payment_enable?
        reserve_frame_params[:monthly_payment_plan_ids].each do |plan_id|
          reserve_frame.reserve_frame_monthly_payment_plans.new(monthly_payment_plan_id: plan_id)
        end
      end
      if reserve_frame.is_ticket_payment_enable?
        reserve_frame_params[:reservable_frame_ticket_master].each do |ticket_master|
          reserve_frame.reserve_frame_ticket_masters.new(ticket_master)
        end
      end
      if reserve_frame_params[:base64_image].present?
        file_name = "reserve_frame_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.s3_object_public_url = put_s3_http_request_data(reserve_frame_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        reserve_frame.s3_object_name = file_name
      end
      if reserve_frame_params[:repeat_wdays].present?
        reserve_frame.is_repeat_sun = true if reserve_frame_params[:repeat_wdays].include?("Sun")
        reserve_frame.is_repeat_mon = true if reserve_frame_params[:repeat_wdays].include?("Mon")
        reserve_frame.is_repeat_tue = true if reserve_frame_params[:repeat_wdays].include?("Tue")
        reserve_frame.is_repeat_wed = true if reserve_frame_params[:repeat_wdays].include?("Wed")
        reserve_frame.is_repeat_thu = true if reserve_frame_params[:repeat_wdays].include?("Thu")
        reserve_frame.is_repeat_fri = true if reserve_frame_params[:repeat_wdays].include?("Fri")
        reserve_frame.is_repeat_sat = true if reserve_frame_params[:repeat_wdays].include?("Sat")
      end
      if reserve_frame_params[:apply_multi_local_payment_price]
        reserve_frame_params[:multi_local_payment_prices].each do |local_payment|
          reserve_frame.reserve_frame_local_payment_prices.new(name: local_payment[:name], price: local_payment[:price])
        end
      end
      if reserve_frame_params[:apply_multi_credit_card_payment_price]
        reserve_frame_params[:multi_credit_card_payment_prices].each do |credit_card_payment|
          reserve_frame.reserve_frame_credit_card_payment_prices.new(name: credit_card_payment[:name], price: credit_card_payment[:price])
        end
      end
      reserve_frame.save!
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      reserve_frame = ReserveFrame.find(params[:id])
      reserve_frame.attributes = reserve_frame_instance_attribute_params

      if reserve_frame_params[:reserve_frame_reception_times].present?
        reserve_frame.reserve_frame_reception_times.delete_all
        reserve_frame_params[:reserve_frame_reception_times].each do |reception_time|
          reserve_frame.reserve_frame_reception_times.new(reception_start_time: reception_time[:reception_start_time], reception_end_time: reception_time[:reception_end_time])
        end
      end
      if reserve_frame_params[:unreservable_frames].present?
        reserve_frame.unreservable_frames.delete_all
        reserve_frame_params[:unreservable_frames].each do |frame|
          reserve_frame.unreservable_frames.new(start_at: frame[:start_at], end_at: frame[:end_at])
        end
      end
      if reserve_frame_params[:out_of_range_frames].present?
        reserve_frame.out_of_range_frames.delete_all
        reserve_frame_params[:out_of_range_frames].each do |frame|
          reserve_frame.out_of_range_frames.new(start_at: frame[:start_at], end_at: frame[:end_at])
        end
      end
      if reserve_frame_params[:resource_ids].present?
        reserve_frame.reserve_frame_resorces.delete_all
        reserve_frame_params[:resource_ids].each do |resource_id|
          reserve_frame.reserve_frame_resorces.new(resource_id: resource_id)
        end
      end
      if reserve_frame.is_monthly_plan_payment_enable?
        reserve_frame.monthly_payment_plans.delete_all
        reserve_frame_params[:monthly_payment_plan_ids].uniq.each do |plan_id|
          reserve_frame.reserve_frame_monthly_payment_plans.new(monthly_payment_plan_id: plan_id)
        end
      end
      if reserve_frame.is_ticket_payment_enable?
        reserve_frame.reserve_frame_ticket_masters.delete_all
        reserve_frame_params[:reservable_frame_ticket_master].each do |ticket_master|
          reserve_frame.reserve_frame_ticket_masters.new(ticket_master)
        end
      end
      if reserve_frame_params[:base64_image].present?
        file_name = "reserve_frame_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N')
        reserve_frame.s3_object_public_url = put_s3_http_request_data(reserve_frame_params[:base64_image], ENV["PRODUCT_IMAGE_BUCKET"], file_name)
        reserve_frame.s3_object_name = file_name
      end
      if reserve_frame_params[:repeat_wdays].present?
        reserve_frame.is_repeat_sun = true if reserve_frame_params[:repeat_wdays].include?("Sun")
        reserve_frame.is_repeat_mon = true if reserve_frame_params[:repeat_wdays].include?("Mon")
        reserve_frame.is_repeat_tue = true if reserve_frame_params[:repeat_wdays].include?("Tue")
        reserve_frame.is_repeat_wed = true if reserve_frame_params[:repeat_wdays].include?("Wed")
        reserve_frame.is_repeat_thu = true if reserve_frame_params[:repeat_wdays].include?("Thu")
        reserve_frame.is_repeat_fri = true if reserve_frame_params[:repeat_wdays].include?("Fri")
        reserve_frame.is_repeat_sat = true if reserve_frame_params[:repeat_wdays].include?("Sat")
      end
      reserve_frame.save!
    end
  end

  def reserve_events
    events = Account.find(params[:account_id]).reserve_calendar_json
    render json: { status: 'success', events: events }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def settable_relation_data
    account = current_merchant_user.account
    questionnaire_masters = account.questionnaire_masters
    resources = account.resources
    ticket_masters = account.ticket_masters
    monthly_payment_plans = account.monthly_payment_plans
    render json: { status: 'success',
                   resources: resources,
                   questionnaire_masters: questionnaire_masters,
                   ticket_masters: ticket_masters,
                   monthly_payment_plans: monthly_payment_plans }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def logical_delete
    reserve_frame = ReserveFrame.find(params[:id])
    reserve_frame.logical_delete
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def reserve_frame_params
    params.require(:reserve_frame)
          .permit(:id,
                  :start_at,
                  :title,
                  :description,
                  :base64_image,
                  :is_repeat,
                  :repeat_interval_type,
                  :repeat_interval_number_day,
                  :repeat_interval_number_week,
                  :repeat_interval_number_month,
                  :repeat_interval_month_date,
                  :repeat_interval_number_month_date,
                  :repeat_end_date,
                  :repeat_wdays,
                  :is_every_day_repeat,
                  :is_every_week_repeat,
                  :is_every_month_repeat,
                  :capacity,
                  :local_payment_price,
                  :credit_card_payment_price,
                  :publish_status,
                  :reception_type,
                  :reception_start_day_before,
                  :reception_phone_number,
                  :cancel_reception,
                  :cancel_reception_day_before,
                  :cancel_reception_hour_before,
                  :is_set_price,
                  :is_local_payment_enable,
                  :is_credit_card_payment_enable,
                  :is_ticket_payment_enable,
                  :is_monthly_plan_payment_enable,
                  :apply_multi_local_payment_price,
                  :apply_multi_credit_card_payment_price,
                  :questionnaire_master_id,
                  multi_local_payment_prices: [:name, :price],
                  multi_credit_card_payment_prices: [:name, :price],
                  repeat_wdays: [],
                  resource_ids: [],
                  monthly_payment_plan_ids: [],
                  reserve_frame_reception_times: [:reception_start_time, :reception_end_time],
                  unreservable_frames: [:start_at, :end_at],
                  out_of_range_frames: [:start_at, :end_at],
                  reservable_frame_ticket_master: [:ticket_master_id, :consume_number])
  end

  def reserve_frame_instance_attribute_params
    reserve_frame_params.except(:unreservable_frames,
                                :out_of_range_frames,
                                :reserve_frame_reception_times,
                                :repeat_interval_number_month_date,
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
