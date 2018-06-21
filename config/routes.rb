Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html



  # Movies
  get "/movies" => "movies#index"
  get "/movies/:id" => "movies#show"

  # Reviews
  # post "/reviews" => "reviews#create"
  resources :reviews



end
