class Webpage < ApplicationRecord
  belongs_to :account
  has_many :webpage_blocks, dependent: :delete_all

  enum publish_status: { Unpublish: 0, Publish: 1 }

  def create_webblocks(webpage_content_string)
    ActiveRecord::Base.transaction do
      webpage_content_json = JSON.parse(webpage_content_string.to_json)
      webpage_content_json["blockContent"].each do |block|
        block["atoms"].each do |atom|
          if atom["atomType"] == "image" && atom["base64Image"].present?
            s3_public_url = put_s3_http_request_data(atom["base64Image"], ENV["WEBPAGE_IMAGE_BUCKET"], "website_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
            atom["base64Image"] = ""
            atom["image"] = s3_public_url
          end

          if atom["atomType"] == "imageSlide"
            atom["imageSlide"].each do |slide|
              if slide["base64Image"].present?
                s3_public_url = put_s3_http_request_data(slide["base64Image"], ENV["WEBPAGE_IMAGE_BUCKET"], "website_slide_image_" + Time.zone.now.strftime('%Y%m%d%H%M%S%3N'))
                slide["base64Image"] = ""
                slide["image"] = s3_public_url
              end
            end
          end
        end
        webpage_blocks.create!(content_json: block.to_s, block_type: block["blockType"])
      end
    end
  end

  def delete_block_images
    s3 = Aws::S3::Client.new(
          access_key_id: ENV['AWS_ACCESS_KEY'],
          secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
          region: "ap-northeast-1"
         )
    parse_webpage = JSON.parse(self.to_json(methods: :block_contents))
    parse_webpage["block_contents"].pluck("atoms")
    parse_webpage["block_contents"].each do |content|
      content["atoms"].each do |atom|
        if atom["atomType"] == "image"
          s3.delete_object(bucket: ENV["WEBPAGE_IMAGE_BUCKET"], key: atom["image"])
        end

        if atom["atomType"] == "imageSlide"
          atom["imageSlide"].each do |slide|
            s3.delete_object(bucket: ENV["WEBPAGE_IMAGE_BUCKET"], key: slide["image"])
          end
        end
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
