class ReviewsController < ApplicationController
  def index
    reviews = Review.all.order(date: :ASC)
    movie_id_input = params[:movie_id]
    puts "movie_id" 
    puts params
    if movie_id_input != nil
      reviews = reviews.where(movie_id: movie_id_input)
    end
    render json: reviews.as_json
  end

  def show
    reviewID = params[:id]
    if (Review.find_by(id: reviewID) == nil)
      render json: {errors: "No review by that id"}
    else
      render json: (Review.find_by(id: reviewID)).as_json
    end
  end

  def create
    puts "Review Created Params"
    puts params
      review = Review.new(movie_id: params[:movie_id], movie_title: params[:movie_title], user_id: params[:user_id], comment:params[:comment], date: params[:date], rating: params[:rating])
      if review.save
        render json: review.as_json
      else
        render json: {errors: review.errors.full_messages}, status: :unprocessable_entity
      end
  end
end
