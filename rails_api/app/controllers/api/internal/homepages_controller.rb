class Api::Internal::HomepagesController < ApplicationController
  def create_web_page
    ActiveRecord::Base.transaction do
      if homepage_params[:website_id].present?
        website = Website.find(homepage_params[:website_id])
      else
        website = current_merchant_user.account.websites.create!
      end
      web_page = website.webpages.new
      web_page.path = homepage_params[:path]
      web_page.tag = homepage_params[:tag]
      page_content = JSON.parse(homepage_params[:page_content].to_json)
      web_page.save!
    end
    render json: { status: 'success', website_id: website.id }, states: 200
  rescue => error
    render json: { statue: 'fail', error: error }, status: 500
  end

  def complete_create_homepage
    website = Website.find(homepage_params[:website_id])
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

  private

  def homepage_params
    params.require(:homepage).permit!
  end
end
