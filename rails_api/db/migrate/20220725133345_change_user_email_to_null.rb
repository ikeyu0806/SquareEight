class ChangeUserEmailToNull < ActiveRecord::Migration[7.0]
  def up
    change_column_null :merchant_users, :email, true
    change_column_null :end_users, :email, true
  end

  def down
    change_column_null :merchant_users, :email, false
    change_column_null :end_users, :email, false
  end
end
