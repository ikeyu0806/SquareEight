class Website < ApplicationRecord
  belongs_to :account
  has_many :webpages, dependent: :destroy

  enum publish_status: { Unpublish: 0, Publish: 1 }

  def create_webpages(webpage_content_string, tag)
    ActiveRecord::Base.transaction do
      web_page = self.webpages.new
      web_page.tag = tag
      web_page.save!
      webpage_content_json = JSON.parse(webpage_content_string.to_json)
      s3 = Aws::S3::Resource.new(
        access_key_id: ENV['AWS_ACCESS_KEY'],
        secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
        region: "ap-northeast-1"
      )
      webpage_content_json.each do |content|
        if content["blockType"] == "textImage"
          image_data = content["blockState"]["base64Image"].gsub(/^data:\w+\/\w+;base64,/, "")
          decode_image = Base64.decode64(image_data)
          extension = content["blockState"]["base64Image"].split("/")[1].split(";")[0]
          content_type = content["blockState"]["base64Image"].split(":")[1].split(";")[0]
          bucket = s3.bucket(ENV["WEBPAGE_IMAGE_BUCKET"])
          obj_name =  "website_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension
          obj = bucket.object(obj_name)
          obj.put(acl: "public-read", body: decode_image, content_type: content_type)
          content["blockState"]["base64Image"] = ""
          content["blockState"]["image"] = obj.public_url
        end

        if content["blockType"] == "imageSlide"
          content["blockState"]["imageSlide"].each do |content|
            image_data = content["base64Image"].gsub(/^data:\w+\/\w+;base64,/, "")
            decode_image = Base64.decode64(image_data)
            extension = content["base64Image"].split("/")[1].split(";")[0]
            content_type = content["base64Image"].split(":")[1].split(";")[0]
            bucket = s3.bucket(ENV["WEBPAGE_IMAGE_BUCKET"])
            obj_name =  "website_slide_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension
            obj = bucket.object(obj_name)
            obj.put(acl: "public-read", body: decode_image, content_type: content_type)
            content["base64Image"] = ""
            content["image"] = obj.public_url
          end
        end

        web_page.webpage_blocks.create!(content_json: content.to_s, block_type: content["blockType"])
      end
    end
  end

  def display_created_at
    created_at.strftime("%Y/%m/%d")
  end

  def top_page_id
    top_page = webpages.find_by(is_top_page: true)
    top_page.present? ? top_page.id : nil
  end

  def header_json
    JSON.parse(default_header_content)
  end

  def footer_json
    JSON.parse(default_footer_content)
  end
end
