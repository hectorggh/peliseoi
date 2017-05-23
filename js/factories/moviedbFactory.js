(function(){
    'use strict';

    angular
        .module('peliseoi')
        .factory('moviedbFactory', moviedbFactory)

    moviedbFactory.$inject = ['$http'];

    function moviedbFactory($http) {
        var service = {
            getData: getData
        };

        return service;

        function getData() {

            return $http.get('https://api.themoviedb.org/3/movie/550?api_key=9a2f5e365768ebb0fcdd4117e6596db5')
                .then ( function (responde){
                    var peli = response;
                    console.log (peli);
                    return peli;
                }
                , function (error){console.log('Hubo algún error');}
                );
         }
    }
})();