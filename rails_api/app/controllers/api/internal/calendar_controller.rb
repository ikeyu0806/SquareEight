class Api::Internal::CalendarController < ApplicationController
  def monthly_reserve_frames
    service = MonthCalendarService.new(params[:target_year].to_i, params[:target_month].to_i, params[:reserve_frame_id])
    calendar_content = service.reserve_content_json
    render json: { status: 'success', calendar_content: calendar_content }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end
end
