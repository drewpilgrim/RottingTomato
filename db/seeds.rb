# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Review.destroy_all

Review.create({user_id: "example@example.com", movie_id: 383498, movie_title: "Deadpool 2", comment: "Great Movie", date: "06-06-2018", rating: 9 })
Review.create({user_id: "critic@example.com", movie_id: 383498, movie_title: "Deadpool 2", comment: "A tad bit childish at times", date: "06-06-2018", rating: 7 })
Review.create({user_id: "superCritic@example.com", movie_id: 383498, movie_title: "Deadpool 2", comment: "Good Movie", date: "06-06-2018", rating: 7 })

