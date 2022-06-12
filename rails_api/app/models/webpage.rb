class Webpage < ApplicationRecord
  belongs_to :website
  has_many :webpage_blocks
  has_many :webpage_images

  def block_contents
    self.webpage_blocks.pluck(:content_json)
  end

  def display_created_at
    created_at.strftime("%Y/%m/%d")
  end
end
