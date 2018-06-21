class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.integer :movie_id
      t.integer :user_id
      t.text :movie_title
      t.text :comment
      t.date :date
      t.integer :rating
      t.timestamps
    end
    
  end


end
