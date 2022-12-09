include LINEClientModule

class Api::V1::Line::MessagingWebhookController < ApplicationController
  def index
    @line_messaging_client
  end
end
