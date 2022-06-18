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

  def update_tag
    Website.find(homepage_params[:website_id]).update!(tag: homepage_params[:tag])
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def publish
    Website.find(homepage_params[:website_id]).update!(publish_status: 'Publish')
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def unpublish
    Website.find(homepage_params[:website_id]).update!(publish_status: 'Unpublish')
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update_shared_component
    Website.find(homepage_params[:website_id])
           .update!(default_header_content: [:default_header_content], default_footer_content: [:default_footer_content])
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def homepage_params
    params.require(:homepage).permit!
  end
end
