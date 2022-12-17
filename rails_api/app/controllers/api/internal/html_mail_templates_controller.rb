class Api::Internal::HtmlMailTemplatesController < ApplicationController
  before_action :merchant_login_only!

  def create

  end

  private

  def html_mail_template_params
    params.require(:html_mail_templates)
          .permit(:id,
                  :public_id,
                  :name,
                  :mail_title,
                  content: [:text, :image, :base64_image])
  end
end
