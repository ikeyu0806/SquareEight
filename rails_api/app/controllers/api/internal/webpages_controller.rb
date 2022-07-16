class Api::Internal::WebpagesController < ApplicationController
  before_action :login_only!, except: :show

  def show
    webpage = Webpage.find(params[:id])
    webpage_json = JSON.parse(webpage.to_json(methods: [:block_contents, :header_json, :footer_json]))
    render json: { status: 'success', webpage: webpage_json }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def create
    ActiveRecord::Base.transaction do
      website = Website.find(webpage_params[:website_id])
      website.create_webpages(webpage_params[:page_content], webpage_params[:tag])
      render json: { status: 'success', website_id: website.id }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def edit
    webpage = Webpage.find(params[:id])
    webpage_json = JSON.parse(webpage.to_json(methods: :block_contents))
    render json: { status: 'success',
                   webpage: webpage_json,
                   max_sort_order: webpage.max_sort_order }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      webpage = Webpage.find(webpage_params[:id])
      webpage.tag = webpage_params[:tag]
      webpage.webpage_blocks.delete_all
      webpage_content_json = JSON.parse(webpage_params[:page_content].to_json)
      webpage_content_json.each do |json|
        webpage.webpage_blocks.create!(content_json: json.to_s, block_type: json["blockType"])
      end
      if webpage_params[:is_top_page]
        webpage.website.webpages.find_by(is_top_page: true).is_top_page = false
        webpage.is_top_page = true
      end
      webpage.save!
    end
    render json: { status: 'success' }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def webpage_params
    params.require(:webpage).permit(:id,
                                    :tag,
                                    :website_id,
                                    :is_top_page,
                                    page_content: [:blockID,
                                                   :blockType,
                                                   :sortOrder,
                                                   blockState:[:text, # 見出し
                                                               :placement,
                                                               :size,
                                                               # 画像+テキスト
                                                               :title,
                                                               :image,
                                                               :base64Image,
                                                               # ページリンク  
                                                               content: [
                                                                 :text,
                                                                 :url
                                                               ],
                                                               # 画像スライド
                                                               imageSlide: [
                                                                 :title,
                                                                 :text,
                                                                 :image,
                                                                 :base64Image,
                                                               ]]])
  end
end
