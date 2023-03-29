class AddIsAcceptReviewProduct < ActiveRecord::Migration[7.0]
  def up
    add_column :products, :is_accept_review, :integer, default: 0
  end

  def down
    remove_column :products, :is_accept_review, :integer, default: 0
  end
end
