class CustomerGroup < ApplicationRecord
  belongs_to :account
  has_many :customer_group_relations
end
