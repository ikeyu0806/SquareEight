include Base64Image

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
      webpage_content_json.each do |content|
        if content["blockType"] == "textImage"
          s3_public_url = put_s3_http_request_data(content["blockState"]["base64Image"], ENV["WEBPAGE_IMAGE_BUCKET"], "website_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
          content["blockState"]["base64Image"] = ""
          content["blockState"]["image"] = s3_public_url
        end

        if content["blockType"] == "imageSlide"
          content["blockState"]["imageSlide"].each do |content|
            s3_public_url = put_s3_http_request_data(content["base64Image"], ENV["WEBPAGE_IMAGE_BUCKET"], "website_slide_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
            content["image"] = s3_public_url
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
