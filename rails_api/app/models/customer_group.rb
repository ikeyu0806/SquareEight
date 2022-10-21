class CustomerGroup < ApplicationRecord
  include PublicIdModule

  belongs_to :account
  has_many :customer_group_relations, dependent: :delete_all
  has_many :customers, through: :customer_group_relations
end
