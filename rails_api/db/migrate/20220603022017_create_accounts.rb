class CreateAccounts < ActiveRecord::Migration[7.0]
  def change
    create_table :accounts do |t|
      t.string :business_name, comment: '名前'
      t.timestamps
    end
  end
end
