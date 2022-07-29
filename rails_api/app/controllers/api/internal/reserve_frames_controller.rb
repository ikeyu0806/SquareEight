include Base64Image

class Api::Internal::ReserveFramesController < ApplicationController
  before_action :merchant_login_only!, except: [:reserve_events, :show]

  def index
    reserve_frames = current_merchant_user.account.reserve_frames
                     .order(:id)
                     .to_json(methods: [:payment_methods_text, :repeat_setting_text, :reception_type_text, :display_start_at, :display_end_at])
    reserve_frames = JSON.parse(reserve_frames)
    render json: { status: 'success', reserve_frames: reserve_frames }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    reserve_frame = ReserveFrame.find(params[:id])
    reserve_frame_json = JSON.parse(reserve_frame.to_json(methods: [:payment_methods]))
    render json: { status: 'success', reserve_frame: reserve_frame_json }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      reserve_frame = current_merchant_user.account.reserve_frames
                      .new(reserve_frame_params.except(:unreservable_frames,
                                                       :reserve_frame_reception_times,
                                                       :repeat_interval_number_month_date,
                                                       :resource_ids,
                                                       :monthly_payment_plan_ids,
                                                       :reservable_frame_ticket_master,
                                                       :base64_image))                   
      reserve_frame_params[:reserve_frame_reception_times].each do |reception_time|
        reserve_frame.reserve_frame_reception_times.new(reception_start_time: reception_time[:reception_start_time], reception_end_time: reception_time[:reception_end_time])
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
      reserve_frame.save!
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def reserve_events
    events = Account.find(params[:account_id]).reserve_calendar_json
    render json: { status: 'success', events: events }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def settable_relation_data
    account = current_merchant_user.account
    resources = account.resources
    ticket_masters = account.ticket_masters
    monthly_payment_plans = account.monthly_payment_plans
    render json: { status: 'success',
                   resources: resources,
                   ticket_masters: ticket_masters,
                   monthly_payment_plans: monthly_payment_plans }, states: 200
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
                  :capacity,
                  :local_payment_price,
                  :credit_card_payment_price,
                  :publish_status,
                  :reception_type,
                  :reception_start_day_before,
                  :cancel_reception,
                  :cancel_reseption_hour_before,
                  :cancel_reseption_day_before,
                  :is_local_payment_enable,
                  :is_credit_card_payment_enable,
                  :is_ticket_payment_enable,
                  :is_monthly_plan_payment_enable,
                  resource_ids: [],
                  monthly_payment_plan_ids: [],
                  reserve_frame_reception_times: [:reception_start_time, :reception_end_time],
                  unreservable_frames: [:start_at, :end_at],
                  reservable_frame_ticket_master: [:ticket_master_id, :consume_number])
  end
end
