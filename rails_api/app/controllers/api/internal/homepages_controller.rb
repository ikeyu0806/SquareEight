class Api::Internal::HomepagesController < ApplicationController
  before_action :login_only!

  def index
    websites_json = JSON.parse current_merchant_user.account.websites.to_json(methods: :display_created_at)
    render json: { status: 'success', websites: websites_json }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    website = current_merchant_user.account.websites.create!(tag: homepage_params[:website_tag])
    render json: { status: 'success', website_id: website.id }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def webpages
    webpages = Website.find(params[:website_id]).webpages
    render json: { status: 'success', webpages: webpages }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def homepage_params
    params.require(:homepage).permit!
  end
end
