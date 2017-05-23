(function(){
    'use strict';

    angular
        .module('peliseoi')
        .controller('homeController', homeController)

    homeController.$inject = ['$scope', 'moviedbFactory'];

    function homeController($scope, moviedbFactory) {
        //var vm = this;

        $scope.getData = getData;
        
        $scope.pelis = [];



        activate();

        function activate() {
            console.log('en activate');
            getData();
         }

         function getData(){
             console.log(`jdoer macho`);
            moviedbFactory.getData();
         }
    }
})();