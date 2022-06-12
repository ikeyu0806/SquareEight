class Webpage < ApplicationRecord
  belongs_to :website
  has_many :webpage_blocks
  has_many :webpage_images

  def display_created_at
    created_at.strftime("%Y/%m/%d")
  end
end
