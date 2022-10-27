class Api::Internal::WebpagesController < ApplicationController
  before_action :merchant_login_only!, except: :show

  def index
    webpages = current_merchant_user.account.webpages
    render json: { status: 'success', webpages: webpages }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def show
    webpage = Webpage.find_by(public_id: params[:public_id])
    webpage_json = JSON.parse(webpage.to_json(methods: [:block_contents]))
    shared_component = webpage.account.shared_component
    render json: { status: 'success', webpage: webpage_json, shared_component: shared_component }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      webpage = current_merchant_user.account.webpages.create!(tag: webpage_params[:tag])
      webpage.publish_status = webpage_params[:publish_status]
      webpage.create_webblocks(webpage_params[:page_content])
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def edit
    webpage = Webpage.find_by(public_id: params[:public_id])
    webpage_json = JSON.parse(webpage.to_json(methods: :block_contents))
    render json: { status: 'success',
                   webpage: webpage_json,
                   max_sort_order: webpage.max_sort_order }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      webpage = Webpage.find_by(public_id: params[:public_id])
      webpage.tag = webpage_params[:tag]
      webpage.publish_status = webpage_params[:publish_status]
      webpage.delete_block_images
      webpage.webpage_blocks.delete_all
      webpage.create_webblocks(webpage_params[:page_content])
      webpage.save!
    end
    render json: { status: 'success' }, status: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def destroy
    ActiveRecord::Base.transaction do
      webpage = Webpage.find_by(public_id: params[:public_id])
      webpage.delete_block_images
      webpage.webpage_blocks.delete_all
      webpage.destroy
      render json: { status: 'success' }, status: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def webpage_params
    params.require(:webpage)
    .permit(:id,
            :public_id,
            :tag,
            :publish_status,
            page_content: [blockContent: [:blockID,
                                          :sortOrder,
                                          atoms: [
                                            :atomType,
                                            :text, # 見出し
                                            :placement,
                                            :size,
                                            # 画像
                                            :base64Image,
                                            :image,
                                            :url,
                                            # 画像スライド
                                            imageSlide: [
                                              :title,
                                              :text,
                                              :image,
                                              :base64Image,
                                              :imageSlideTextColor,
                                            ],
                                            content: [
                                              # ページリンク 
                                              :text,
                                              :url,
                                            ]
                                          ]]])
  end
end
