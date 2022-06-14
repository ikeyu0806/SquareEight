class Api::Internal::WebpagesController < ApplicationController
  before_action :login_only!

  def create
    ActiveRecord::Base.transaction do
      if webpage_params[:website_id].present?
        website = Website.find(webpage_params[:website_id])
      else
        website = current_merchant_user.account.websites.create!
      end
      website.create_webpages(webpage_params[:page_content], webpage_params[:path], webpage_params[:tag])
      render json: { status: 'success', website_id: website.id }, states: 200
    end
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def complete_create_homepage
    website = Website.find(webpage_params[:website_id])
    # webページ作成
    website.create_webpages(webpage_params[:page_content], webpage_params[:path], webpage_params[:tag])
    # HTML生成
    root = Nokogiri::HTML::DocumentFragment.parse('')
    website.webpages.each do |webpage|
      webpage.webpage_blocks.each do |block|
        content = block.content_json
        case content["blockType"]
        when "heading" then
          Nokogiri::HTML::Builder.with(root) do |t|
            div_class = content["blockState"]["placement"] == "left" ? "text-left" : "text-center"
            t.div(class: div_class) do
              # メタプログラミングできそうだけどとりあえず愚直に実装
              case content["blockState"]["size"]
              when 1 then
                t.h1 content["blockState"]["text"]
              when 2 then
                t.h2 content["blockState"]["text"]
              when 3 then
                t.h3 content["blockState"]["text"]
              when 4 then
                t.h4 content["blockState"]["text"]
              when 5 then
                t.h5 content["blockState"]["text"]
              when 6 then
                t.h6 content["blockState"]["text"]
              else
                raise "見出しの形式が不正です"
              end
            end
            webpage.webpage_blocks.create!(content_json: content, block_type: "heading")
          end
        when "textImage" then
          s3 = Aws::S3::Resource.new(
            access_key_id: ENV['AWS_ACCESS_KEY'],
            secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
            region: "ap-northeast-1"
          )
          image_data = content["blockState"]["base64Image"].gsub(/^data:\w+\/\w+;base64,/, "")
          decode_image =Base64.decode64(image_data)
          extension = content["blockState"]["base64Image"].split("/")[1].split(";")[0]
          content_type = content["blockState"]["base64Image"].split(":")[1].split(";")[0]
          bucket = s3.bucket("smartlesson-webpage-image-bucket-develop")
          obj_name =  "website_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension
          obj = bucket.object(obj_name)
          obj.put(acl: "public-read", body: decode_image, content_type: content_type)
          Nokogiri::HTML::Builder.with(root) do |t|
            t.h2 content["blockState"]["title"]
            t.div content["blockState"]["text"]
          end
        else
          raise "不正なブロックタイプが含まれています"
        end
      end
    end
    root.to_html
  end
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
                                    :website_id,
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
