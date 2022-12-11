include LineClientModule

class Api::V1::Line::MessagingWebhookController < ApplicationController
  def index
    line_account = LineOfficialAccount.find_by(public_id: params[:line_account_public_id])
    client = line_messaging_client(line_account.channel_id, line_account.channel_secret, line_account.channel_token)

    body = request.body.read

    signature = request.env['HTTP_X_LINE_SIGNATURE']
    unless client.validate_signature(body, signature)
      error 400 do 'Bad Request' end
    end
  
    events = client.parse_events_from(body)
    events.each do |event|
      case event
      when Line::Bot::Event::Message
        case event.type
        when Line::Bot::Event::MessageType::Text
          message = {
            type: 'text',
            text: event.message['text']
          }
          client.reply_message(event['replyToken'], message)
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