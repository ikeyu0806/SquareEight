class Api::Internal::WebpagesController < ApplicationController
  def edit
    webpage = Webpage.find(params[:id])
    webpage_json = JSON.parse(webpage.to_json(methods: :block_contents))
    render json: { status: 'success', webpage: webpage_json }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def update
    ActiveRecord::Base.transaction do
      webpage = Webpage.find(webpage_params[:id])
      webpage.path = webpage_params[:path]
      webpage.tag = webpage_params[:tag]
      webpage.save!
      webpage.webpage_blocks.delete_all
      webpage_content_json = JSON.parse(webpage_params[:page_content].to_json)
      webpage_content_json.each do |json|
        webpage.webpage_blocks.create!(content_json: json.to_s, block_type: json["blockType"])
      end
      render json: { status: 'success' }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  private

  def webpage_params
    params.require(:webpage).permit(:id,
                                    :path,
                                    :tag,
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
                                                                 :image
                                                               ]]])
  end
end
