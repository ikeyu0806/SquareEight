class CustomerGroup < ApplicationRecord
  belongs_to :account
  has_many :customer_group_relations
  has_many :customers, through: :customer_group_relations
end
