class Webpage < ApplicationRecord
  belongs_to :website
  has_many :webpage_blocks, dependent: :delete_all

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
