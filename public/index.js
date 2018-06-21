/* global Vue, VueRouter, axios */

// import Vue from 'vue'
// import VueYoutube from 'vue-youtube'
 
// Vue.use(VueYoutube)


var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      searchType: "popular",
      sortType: "Title",
      movies: [],
      errors: []
    };
  },
  created: function() {
    this.loadMoviesPopular(); 
  },
  methods: {
    loadMoviesRating: function(){
      var params = {
        searchType: "top_rated"
      };
      axios
          .get("/movies",{params: params})
          .then(function(response) {
            console.log(response.data);
            this.movies = response.data.movie_data.results;
          }.bind(this)
          ).catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this)
          );
    },
    loadMoviesPopular: function(){
      var params = {
        searchType: "popular"
      };
      axios
          .get("/movies",{params: params})
          .then(function(response) {
            console.log(response.data);
            this.movies = response.data.movie_data.results;
          }.bind(this)
          ).catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this)
          );
    },
    setSearchTerm: function(searchType){
      this.searchType = searchType;
    },
    setSortTerm: function(sortType){
      this.sortType = sortType;

    },
  },
  computed: {
    sortedMovies: function(){
      if(this.sortType === "Title"){
        return this.movies.sort(function(a, b) {
          var titleA = a.title.toUpperCase(); // ignore upper and lowercase
          var titleB = b.title.toUpperCase(); // ignore upper and lowercase
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }

          // names must be equal
          return 0;
        });
      }
      if(this.sortType === "Rating"){
        return this.movies.sort(function(a, b) {
            return b.vote_average - a.vote_average;
        });
      }
      if(this.sortType === "Release_Date"){
        return this.movies.sort(function(a, b) {
            if (a.release_date > b.release_date) {
              return -1;
            }
            if (a.release_date < b.release_date) {
              return 1;
            }

            // names must be equal
            return 0;
        });
      }
      //Genre Isn't supported by the API
      // if(sortType === "Genre"){
      //   return movies.sort(function(a, b) {
      //     var titleA = a.genre.toUpperCase(); // ignore upper and lowercase
      //     var titleB = b.genre.toUpperCase(); // ignore upper and lowercase
      //     if (titleA < titleB) {
      //       return -1;
      //     }
      //     if (titleA > titleB) {
      //       return 1;
      //     }

      //     // names must be equal
      //     return 0;
      //   });
      // }

      return this.movies
    },
  }
};

var MovieShowPage = {
  template: "#movie-show-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      movie: [],
      reviews: [],
      errors: [],
      userEmail: "youremail@gmail.com",
      rating: 10,
      comment: " ",
      dateSeen: null,
      trailerURL: "",
    };
  },
  created: function() {
    this.loadMovie();

      },
  methods: {
    playVideo: function(){
      this.player.playVideo();
    },
    playing: function(){
      console.log("Playing");
    },
    loadMovie: function(){
      var params = {
        id: this.$route.params.id
      };
      axios
          .get("/movies/" + this.$route.params.id)
          .then(function(response) {
            console.log("Response:")
            console.log(response);
            this.movie = response.data.movie_data;
            var trailers = response.data.trailer_data.results;
            var trailerKey = trailers[0].key;
            for (i = 1; i<trailers.length; i++){
              trailerKey += "," + trailers[i].key;
            }
            console.log(trailerKey)
            var trailerURL = "https://www.youtube.com/embed/VIDEO_ID?playlist="+trailerKey;
            console.log(trailerURL);
            document.getElementById("trailerVid").src = trailerURL;
          }.bind(this)
          ).catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this)
          );
    },
    loadReviews: function(){
      var params = {
        movie_id: this.$route.params.id
      };
      console.log(params);
      axios
          .get("/reviews", {params})
          .then(function(response) {
            console.log("Reviews Loaded");
            this.reviews = response.data;
          }.bind(this)
          ).catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this)
          );
    },
    submit: function(){
      var params = {
        user_id: this.userEmail,
        rating: this.rating,
        comment: this.comment,
        date: this.dateSeen,
        movie_id: this.movie.id,
        movie_title: this.movie.title
      };
      axios
        .post("/reviews", params)
        .then(function(response) {
            var x = document.getElementById("reviewCreated");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        })
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
   
  },
  computed: {
    player: function () {
      return this.$refs.youtube.player
    }
  }
};

var ReviewPage = {
  template: "#review-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      errors: [],
      reviews: []
    };
  },
  created: function() {
    this.loadReviews();
  },
  methods: {
    loadReviews: function(){
      axios
          .get("/reviews/")
          .then(function(response) {
            console.log("Reviews Loaded");
            this.reviews = response.data;
          }.bind(this)
          ).catch(
            function(error) {
              this.errors = error.response.data.errors;
            }.bind(this)
          );
    }
  },
  computed: {}
};


var AboutPage = {
  template: "#about-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  created: function() {},
  methods: {
    
  },
  computed: {}
};



var router = new VueRouter({
  routes: [
    { path: "/", component: HomePage },
    { path: "/about", component: AboutPage },
    { path: "/movie/:id", component: MovieShowPage },
    { path: "/reviews", component: ReviewPage},

],

  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 };
  }
});

var app = new Vue({
  el: "#vue-app",
  router: router
});