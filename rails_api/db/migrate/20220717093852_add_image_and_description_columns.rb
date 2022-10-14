class AddImageAndDescriptionColumns < ActiveRecord::Migration[7.0]
  def up
    add_column :ticket_masters, :description, :text
  end

  def down
    remove_column :ticket_masters, :description, :text
  end
end
