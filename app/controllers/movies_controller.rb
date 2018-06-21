require "unirest"

class MoviesController < ApplicationController
  def index
    api_key = ENV['API_KEY']
    api_Call = "http://api.themoviedb.org/3/movie/" + params[:searchType] + "?api_key=" + api_key.to_s
    response = Unirest.get(api_Call)

    trailer_api_Call = "http://api.themoviedb.org/3/movie/" + params[:searchType] + "/videos" + "?api_key=ccc65938377c518796bde2e9995d7dbc"
    trailerResponse = Unirest.get(trailer_api_Call)
    render json: {movie_data: response.body, trailer_data: trailerResponse.body}
  end

  def show
    api_key = ENV['API_KEY']
    api_Call = "http://api.themoviedb.org/3/movie/" + params[:id] +"?api_key=" + api_key.to_s
    response = Unirest.get(api_Call)
    trailer_api_Call = "http://api.themoviedb.org/3/movie/" + params[:id] + "/videos" + "?api_key=" + api_key.to_s
    trailerResponse = Unirest.get(trailer_api_Call)
    render json: {movie_data: response.body, trailer_data: trailerResponse.body}
  end



end
