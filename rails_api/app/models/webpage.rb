class Webpage < ApplicationRecord
  belongs_to :account
  has_many :webpage_blocks, dependent: :delete_all

  def create_webblocks(webpage_content_string)
    ActiveRecord::Base.transaction do
      webpage_content_json = JSON.parse(webpage_content_string.to_json)
      webpage_content_json["blockContent"].each do |block|
        block["atoms"].each do |atom|
          if atom["atomType"] == "image"
            s3_public_url = put_s3_http_request_data(atom["base64Image"], ENV["WEBPAGE_IMAGE_BUCKET"], "website_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
            atom["base64Image"] = ""
            atom["image"] = s3_public_url
          end
  
          if atom["atomType"] == "imageSlide"
            atom["imageSlide"].each do |slide|
              s3_public_url = put_s3_http_request_data(slide["base64Image"], ENV["WEBPAGE_IMAGE_BUCKET"], "website_slide_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
              atom["image"] = s3_public_url
            end
          end
        end
        webpage_blocks.create!(content_json: block.to_s, block_type: block["blockType"])
      end
    end
  end

  def block_contents
    result = []
    self.webpage_blocks.each do |block|
      block_json = JSON.parse(block.content_json.gsub(" ", "").gsub("=>", ":"))
      result.push(block_json)
    end
    result
  end

  def max_sort_order
    self.block_contents.max_by{|b| b["sortOrder"] }["sortOrder"]
  end

  def display_created_at
    created_at.strftime("%Y/%m/%d")
  end

  def header_json
    website.default_header_content.present? ? JSON.parse(website.default_header_content) : []
  end

  def footer_json
    website.default_header_content.present? ? JSON.parse(website.default_footer_content) : []
  end
end
