class AddNotesCustomer < ActiveRecord::Migration[7.0]
  def up
    add_column :customers, :notes, :text
  end

  def down
    remove_column :customers, :notess, :text
  end
end
