module LineClientModule
  extend ActiveSupport::Concern

  def line_messaging_client(channel_id, channel_secret, channel_token)
      @line_messaging_client ||= Line::Bot::Client.new { |config|
        config.channel_id = channel_id
        config.channel_secret = channel_secret
        config.channel_token = channel_token
      }
  end
end
