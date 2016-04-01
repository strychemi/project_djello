var djello = angular.module('djello', ['ui.router', 'ui.bootstrap', 'restangular', 'Devise'])
    //Restangular Config
    .config(['RestangularProvider', function(RestangularProvider){
        RestangularProvider.setBaseUrl('/api/v1');
        RestangularProvider.setRequestSuffix('.json');
    }])
    //Devise Config
    .config(function(AuthProvider) {
        // Configure Auth service with AuthProvider
    })
    //UI Router Config
    .config(['$urlRouterProvider', '$stateProvider',
        function($urlRouterProvider, $stateProvider) {
            $stateProvider

                .state('home', {
                    url: '',
                    templateUrl: 'templates/home.html',
                })

        }])
    //Error Logging
    .run(function($rootScope){
        $rootScope.$on("$stateChangeError", console.log.bind(console));
    });