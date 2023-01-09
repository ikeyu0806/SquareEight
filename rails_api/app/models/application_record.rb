class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  def current_date_text
    Time.zone.now.strftime("%Y年%m月%d日")
  end
end
