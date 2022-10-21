class CreateUnreservableFrames < ActiveRecord::Migration[7.0]
  def change
    create_table :unreservable_frames do |t|
      t.integer :reserve_frame_id
      t.datetime :start_at
      t.datetime :end_at
      t.string :public_id, null: false

      t.timestamps
    end
  end
end
