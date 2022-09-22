class AddDeletedAtColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :reserve_frames, :deleted_at, :datetime
    add_column :products, :deleted_at, :datetime
    add_column :ticket_masters, :deleted_at, :datetime
    add_column :monthly_payment_plans, :deleted_at, :datetime
    add_column :questionnaire_masters, :deleted_at, :datetime
  end

  def down
    remove_column :reserve_frames, :deleted_at, :datetime
    remove_column :products, :deleted_at, :datetime
    remove_column :ticket_masters, :deleted_at, :datetime
    remove_column :monthly_payment_plans, :deleted_at, :datetime
    remove_column :questionnaire_masters, :deleted_at, :datetime
  end
end
