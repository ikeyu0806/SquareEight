include LineClientModule

class Api::Batch::SendLineSchedulesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def send_same_hour_schedule
    current_datetime = Time.zone.now.strftime("%Y%m%d%H")
    send_line_schedules = SendLineSchedule.select{|t| t.scheduled_datetime&.strftime("%Y%m%d%H") == current_datetime}
    send_line_schedules.each do |schedule|
      line_account = schedule.line_official_account
      line_user = schedule.line_user
      client = line_messaging_client(line_account.channel_id, line_account.channel_secret, line_account.channel_token)
      client.push_message(line_user.line_user_id, {
        type: 'text',
        text: message
      })
      schedule.update!(send_status: 'Complete')
    end
    render json: { status: 'success', account: account }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
