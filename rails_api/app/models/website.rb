class Website < ApplicationRecord
  belongs_to :account
  has_many :webpages

  def create_webpages(webpage_content_string, path, tag)
    web_page = self.webpages.new
    web_page.path = path
    web_page.tag = tag
    web_page.save!
    webpage_content_json = JSON.parse(webpage_content_string.to_json)
    webpage_content_json.each do |json|
      web_page.webpage_blocks.create!(content_json: json.to_s, block_type: json["blockType"])
    end
  end
end
