class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :title
      t.string :description
      t.integer :list_id

      t.timestamps null: false
    end
  end
end
