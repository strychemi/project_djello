var djello = angular.module('djello', ['ui.router', 'ui.bootstrap', 'restangular', 'Devise', 'xeditable' ])
    //Restangular Config
    .config(['RestangularProvider', function(RestangularProvider){
        RestangularProvider.setBaseUrl('/api/v1');
        RestangularProvider.setRequestSuffix('.json');
    }])
    //Devise Config
    .config(function(AuthProvider) {
        // Configure Auth service with AuthProvider
        // headers: {'X-HTTP-Method-Override': 'DELETE'}
    })
    //UI Router Config
    .config(['$urlRouterProvider', '$stateProvider',
        function($urlRouterProvider, $stateProvider) {
          $stateProvider

            .state('home', {
              url: '',
              templateUrl: 'templates/home.html',
            })
            .state('boards', {
              url: '/boards',
              abstract: true,
              views: {
                '': {
                  template: '<ui-view></ui-view>',
                  controller: 'BoardsCtrl'
                }
              },
              resolve: {
                data: ['apiService', function(apiService){
                  return apiService.getData();
                }]
              }
            })
            .state('boards.index', {
              url: '',
              templateUrl: 'templates/boards/boardIndex.html',
              controller: 'BoardsCtrl',
            })
            .state('boards.show', {
              url: '/:id',
              templateUrl: 'templates/boards/boardShow.html',
              controller: 'BoardsShowCtrl',
              resolve: {
                board: ['apiService', '$stateParams', function(apiService, $stateParams) {
                  return apiService.boards[$stateParams.id];
                }]
              }
            });
        }])
    //Error Logging
    .run(function($rootScope){
      $rootScope.$on("$stateChangeError", console.log.bind(console));
    })
    .run(function(editableOptions) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    });
