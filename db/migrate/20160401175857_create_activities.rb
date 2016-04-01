class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :user_id
      t.integer :activable_id
      t.string :activable_type
      t.string :description

      t.timestamps null: false
    end
  end
end
