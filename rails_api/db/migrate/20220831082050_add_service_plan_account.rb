class AddServicePlanAccount < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :service_plan, :integer, default: 0
  end

  def down
    remove_column :accounts, :service_plan, :integer
  end
end
