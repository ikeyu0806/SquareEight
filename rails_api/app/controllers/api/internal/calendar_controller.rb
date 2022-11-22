class Api::Internal::CalendarController < ApplicationController
  def monthly_reserve_frames
    reserve_frame = ReserveFrame.find_by(public_id: params[:public_id])
    shared_component = reserve_frame.account.shared_component
    service = MonthCalendarService.new(params[:target_year].to_i, params[:target_month].to_i, reserve_frame.id)
    calendar_content = service.reserve_content_json
    render json: { status: 'success',
                   shared_component: shared_component,
                   reserve_frame: reserve_frame,
                   calendar_content: calendar_content }, status: 200
  rescue => error
    render json: { status: 'fail', error: error }, status: 500
  end
end
