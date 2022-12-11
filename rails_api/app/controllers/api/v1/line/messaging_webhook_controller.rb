include LineClientModule

class Api::V1::Line::MessagingWebhookController < ApplicationController
  def index
    line_account = LineOfficialAccount.find_by(public_id: params[:line_account_public_id])
    client = line_messaging_client(line_account.channel_id, line_account.channel_secret, line_account.channel_token)

    account = line_account.account

    body = request.body.read

    signature = request.env['HTTP_X_LINE_SIGNATURE']
    unless client.validate_signature(body, signature)
      error 400 do 'Bad Request' end
    end

    access_token_response = Faraday.post("https://api.line.me/oauth2/v2.1/token") do |request|
      request.headers["Content-Type"] = "application/x-www-form-urlencoded"
      request.body = {
        grant_type: 'authorization_code',
        
      }
    end
  
    events = client.parse_events_from(body)
    events.each do |event|
      case event
      when Line::Bot::Event::Message
        case event.type
        # when Line::Bot::Event::MessageType::Follow
        when Line::Bot::Event::MessageType::Text
          message = {
            type: 'text',
            text: event.message['text']
          }
          client.reply_message(event['replyToken'], message)
          line_user_profile = Faraday.get("https://api.line.me/v2/profile/#{event["source"]["userId"]}") do |request|
            request.headers["Authorization"] = "Bearer " + line_account.channel_token
          end
          line_user_response = client.get_profile(event["source"]["userId"])
          line_user_response = JSON.parse(line_user_response.body)
          line_user = line_account.line_users.find_or_initialize_by(line_user_id: event["source"]["userId"])
          line_user.account = account
          line_user.line_display_name = line_user_response["displayName"]
          line_user.line_picture_url = line_user_response["pictureUrl"]
          line_user.save!
        # when Line::Bot::Event::MessageType::Image, Line::Bot::Event::MessageType::Video
        #   response = client.get_message_content(event.message['id'])
        #   tf = Tempfile.open("content")
        #   tf.write(response.body)
        end
      end
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    Rails.logger.error error
    render json: { status: 'fail', error: error }, status: 500
  end
end
