var djello = angular.module('djello', ['ui.router', 'ui.bootstrap', 'restangular'])

    .config(['RestangularProvider', function(RestangularProvider){
        RestangularProvider.setBaseUrl('/api/v1');
        RestangularProvider.setRequestSuffix('.json');
    }])

    .config(['$urlRouterProvider', '$stateProvider',
        function($urlRouterProvider, $stateProvider) {
            $stateProvider

                .state('home', {
                    url: '',
                    templateUrl: 'templates/home.html',
                })

        }])

    .run(function($rootScope){
        $rootScope.$on("$stateChangeError", console.log.bind(console));
    });