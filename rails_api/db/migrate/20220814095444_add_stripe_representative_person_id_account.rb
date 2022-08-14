class AddStripeRepresentativePersonIdAccount < ActiveRecord::Migration[7.0]
  def up
    add_column :accounts, :stripe_representative_person_id, :string
  end

  def down
    remove_column :accounts, :stripe_representative_person_id, :string
  end
end
