(function () {
    'use strict';

    angular
        .module('peliseoi')
        .controller('homeController', homeController)

    homeController.$inject = ['$scope', 'moviedbFactory'];

    function homeController($scope, moviedbFactory) {

        $scope.getDiscover = getDiscover;
        $scope.getPopular = getPopular;
        $scope.getUpcoming = getUpcoming;
        $scope.getCat = getCat;
        //$scope.search = search;
        $scope.next = next;
        $scope.borrar = borrar;
        $scope.getPeli = getPeli;
        $scope.yearSliderUpdated = '';
        $scope.valSliderUpdated = '';
        $scope.getSliderYear = function (sliderId) {
            $scope.yearSliderUpdated = $scope.slider.minValue + ' - ' + $scope.slider.maxValue;
            $scope.valSliderUpdated = $scope.slider1.minValue + ' - ' + $scope.slider1.maxValue;
            moviedbFactory.filter($scope.slider.minValue, $scope.slider.maxValue, $scope.slider1.minValue, $scope.slider1.maxValue).then(pelisLoaded);
        };
        $scope.loadMore = function () {
            var last = $scope.pelis[$scope.pelis.length - 1];
            for (var i = 1; i <= 8; i++) {
                $scope.pelis.push(last + i);
            }
        };
        /////////////////////// Variables ////////////////////////////////////////////////

        $scope.peli = [];
        $scope.pelis = [];
        $scope.trailer = "_H-T7RPvt2k";
        $scope.score = [];

        //////////////////// Sliders -----------------------------------------------------
        $scope.slider = {
            minValue: 1917,
            maxValue: 2017,
            options: {
                floor: 1917,
                ceil: 2017,
                noSwitching: true,
                id: 'sliderA',
                hideLimitLabels: true,
                onEnd: $scope.getSliderYear
            }
        };

        $scope.slider1 = {
            minValue: 0,
            maxValue: 10,
            options: {
                floor: 0,
                ceil: 10,
                noSwitching: true,
                id: 'sliderB',
                hideLimitLabels: true,
                onEnd: $scope.getSliderYear
            }
        };

        //-----------------------------------------------------------------------------

        activate();

        function activate() {
            moviedbFactory.getDiscover().then(pelisLoaded);
        }

        function getDiscover() {
            moviedbFactory.getDiscover().then(pelisLoaded);
        }

        function getPopular() {
            moviedbFactory.getPopular().then(pelisLoaded);
        }

        function getUpcoming() {
            moviedbFactory.getUpcoming().then(pelisLoaded);
        }

        function getCat(id) {
            moviedbFactory.getCat(id).then(pelisLoaded);
        }

        function pelisLoaded(pelis) {
            $scope.pelis = pelis;
        }

        function peliLoaded(peli) {
            $scope.peli = peli;
            moviedbFactory.getScore(peli.imdb_id).then(scoreLoaded);
        }

        function trailerLoaded(trailer) {
            $scope.trailer = trailer;
        }

        function scoreLoaded(score) {
            $scope.score = score;
        }

        function next() {

        }

        function borrar() {
            $scope.slider.minValue = 1917;
            $scope.slider.maxValue = 2017;
            $scope.slider1.minValue = 0;
            $scope.slider1.maxValue = 10;
            moviedbFactory.filter($scope.slider.minValue, $scope.slider.maxValue, $scope.slider1.minValue, $scope.slider1.maxValue).then(pelisLoaded);
        }

        function search(busqueda) {
            moviedbFactory.search(busqueda).then(pelisLoaded);
        }



        function getPeli(peli) {
            moviedbFactory.getDetails(peli.id).then(peliLoaded);
            moviedbFactory.getTrailer(peli.id).then(trailerLoaded);
        }



    }
})();