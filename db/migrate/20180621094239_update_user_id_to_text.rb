class UpdateUserIdToText < ActiveRecord::Migration[5.1]
  def change
    change_column :reviews, :user_id, :text

  end
end
