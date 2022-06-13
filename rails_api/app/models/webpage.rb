class Webpage < ApplicationRecord
  belongs_to :website
  has_many :webpage_blocks
  has_many :webpage_images

  def block_contents
    result = []
    self.webpage_blocks.each do |block|
      block_json = JSON.parse(block.content_json.gsub(" ", "").gsub("=>", ":"))
      result.push(block_json)
    end
    result
  end

  def display_created_at
    created_at.strftime("%Y/%m/%d")
  end
end
