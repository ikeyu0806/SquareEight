class CustomerGroupRelation < ApplicationRecord
  include PublicIdModule

  has_many :customers, foreign_key: :id, primary_key: :customer_id
  has_many :customer_groups, foreign_key: :id, primary_key: :customer_group_id
end
