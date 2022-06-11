class Webpage < ApplicationRecord
  belongs_to :website
  has_many :webpage_blocks
  has_many :webpage_images
end
