class Website < ApplicationRecord
  belongs_to :account
  has_many :webpages

  enum publish_status: { Unpublish: 0, Publish: 1 }

  def create_webpages(webpage_content_string, tag)
    ActiveRecord::Base.transaction do
      web_page = self.webpages.new
      web_page.tag = tag
      web_page.save!
      webpage_content_json = JSON.parse(webpage_content_string.to_json)
      webpage_content_json.each do |content|
        if content["blockType"] == "textImage"
          s3 = Aws::S3::Resource.new(
            access_key_id: ENV['AWS_ACCESS_KEY'],
            secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
            region: "ap-northeast-1"
          )
          image_data = content["blockState"]["base64Image"].gsub(/^data:\w+\/\w+;base64,/, "")
          decode_image = Base64.decode64(image_data)
          extension = content["blockState"]["base64Image"].split("/")[1].split(";")[0]
          content_type = content["blockState"]["base64Image"].split(":")[1].split(";")[0]
          bucket = s3.bucket("smartlesson-webpage-image-bucket-develop")
          obj_name =  "website_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N') + "." + extension
          obj = bucket.object(obj_name)
          obj.put(acl: "public-read", body: decode_image, content_type: content_type)
          content["blockState"]["base64Image"] = ""
          content["blockState"]["image"] = obj.public_url
        end

        if content["blockType"] == "imageSlide"
          
        end

        web_page.webpage_blocks.create!(content_json: content.to_s, block_type: content["blockType"])
      end
    end
  end

  def display_created_at
    created_at.strftime("%Y/%m/%d")
  end
end
