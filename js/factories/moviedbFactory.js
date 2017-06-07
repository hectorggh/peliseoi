(function(){
    'use strict';

    angular
        .module('peliseoi')
        .factory('moviedbFactory', moviedbFactory)

    moviedbFactory.$inject = ['$http'];

    function moviedbFactory($http) {
        var service = {
            getDiscover: getDiscover,
            getPopular: getPopular,
            getUpcoming: getUpcoming,
            getCat: getCat,
            getDetails: getDetails,
            getTrailer: getTrailer,
            getScore: getScore,
            search: search,
            filter: filter
        };

        return service;

        function getDiscover() {
           return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=9a2f5e365768ebb0fcdd4117e6596db5&language=en-US&sort_by=revenue.desc&include_adult=false&include_video=false&page=1')
                .then ( function (response){
                    var pelis = response.data.results;
                    var length = response.data.results.length;
                    return pelis;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }

         function getPopular() {
           return $http.get('https://api.themoviedb.org/3/movie/popular?api_key=9a2f5e365768ebb0fcdd4117e6596db5&language=en-US&page=1')
                .then ( function (response){
                    var pelis = response.data.results;
                    var length = response.data.results.length;
                    return pelis;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }

         function getUpcoming() {
           return $http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=9a2f5e365768ebb0fcdd4117e6596db5&language=en-US&page=1with_genres=action')
                .then ( function (response){
                    var pelis = response.data.results;
                    var length = response.data.results.length;
                    return pelis;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }

         function getCat(id) {
           return $http.get('https://api.themoviedb.org/3/genre/'+id+'/movies?api_key=9a2f5e365768ebb0fcdd4117e6596db5&language=en-US&include_adult=false&sort_by=created_at.asc')
                .then ( function (response){
                    var pelis = response.data.results;
                    var length = response.data.results.length;
                    return pelis;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }

         function search(busqueda) {
           return $http.get('https://api.themoviedb.org/3/search/movie?api_key=9a2f5e365768ebb0fcdd4117e6596db5&language=es-ES&query=' + busqueda + '&page=1&include_adult=false')
                .then ( function (response){
                    var pelis = response.data.results;
                    var length = response.data.results.length;
                    return pelis;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }

         function filter(myear,Myear,mval,Mval) {
           return $http.get('https://api.themoviedb.org/3/discover/movie?api_key=9a2f5e365768ebb0fcdd4117e6596db5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=' + myear + '&primary_release_date.lte=' + Myear + '&vote_average.gte=' + mval + '&vote_average.lte=' + Mval)
                .then ( function (response){
                    var pelis = response.data.results;
                    return pelis;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }

         function getDetails(id){
             return $http.get('https://api.themoviedb.org/3/movie/' + id +'?api_key=9a2f5e365768ebb0fcdd4117e6596db5&language=en-US')
                .then ( function (response){
                    var peli = response.data;
                    peli.release_date = peli.release_date.substring(0,4);
                    return peli;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }

         function getTrailer(id){
             return $http.get('https://api.themoviedb.org/3/movie/' + id + '/videos?api_key=9a2f5e365768ebb0fcdd4117e6596db5&language=en-US')
                .then ( function (response){
                    var peli = response.data.results[0];
                    var trailer = peli.key;
                    trailer = 'https://www.youtube.com/embed/' + trailer;
                    return trailer;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }

         function getScore(imdb){
             return $http.get('http://omdbapi.com/?i=' + imdb + '&apikey=3370463f')
                .then ( function (response){
                    var score = response.data;
                    return score;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }
    }
})();