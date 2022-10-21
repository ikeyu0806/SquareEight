class WebpageBlock < ApplicationRecord
  include PublicIdModule

  belongs_to :webpage
end
