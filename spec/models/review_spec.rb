require 'rails_helper'

RSpec.describe Review, type: :model do
  it "is not valid without a user_id" do 
    review = Review.new
    expect(review).not_to be_valid
  end

  it "is not valid without a movie_id" do 
    review = Review.new({user_id: "example@example.com", movie_title: "Deadpool 2", comment: "Great Movie", date: "06-06-2018", rating: 9 })
    expect(review).not_to be_valid

  end

  it "is not valid without a rating" do 
    review = Review.new({user_id: "superCritic@example.com", movie_id: 383498, movie_title: "Deadpool 2", comment: "Good Movie", date: "06-06-2018" })
    expect(review).not_to be_valid
  end

  it "is not valid without a date" do 
    review = Review.new({user_id: "superCritic@example.com", movie_id: 383498, movie_title: "Deadpool 2", comment: "Good Movie"})
    expect(review).not_to be_valid
  end


end
