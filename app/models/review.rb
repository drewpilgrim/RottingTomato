class Review < ApplicationRecord

  validates :user_id, presence: true
  validates :movie_id, presence: true
  validates :comment, length: {in: 0..500}
  validates :rating, presence: true
  validates :date, presence: true


  
end
