class Api::Internal::HomepagesController < ApplicationController
  before_action :login_only!

  def index
    websites_json = JSON.parse current_merchant_user.account.websites.order(:id).to_json(methods: [:display_created_at, :top_page_id])
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
    webpages = Website.find(params[:website_id]).webpages.order(:id)
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

  def shared_component
    website = Website.find(params[:id])
    render json: { status: 'success',
                   header_json: website.header_json,
                   footer_json: website.footer_json }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update_shared_component
    Website.find(homepage_params[:website_id])
           .update!(default_header_content: homepage_params[:default_header_content].to_json,
                    default_footer_content: homepage_params[:default_footer_content].to_json)
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def homepage_params
    params.require(:homepage).permit!
  end
end
