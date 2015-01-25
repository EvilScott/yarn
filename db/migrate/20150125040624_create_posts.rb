class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :content
      t.integer :parent
      t.belongs_to :user, index: true

      t.timestamps null: false
    end
    add_index :posts, :parent
    add_foreign_key :posts, :users
  end
end
