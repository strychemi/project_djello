var djello = angular.module('djello', ['ui.router', 'ui.bootstrap', 'restangular', 'Devise', 'xeditable', 'angularModalService'])
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
          $urlRouterProvider.otherwise('/boards');
          $stateProvider
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
                boardData: ['dataService', function(dataService) {
                  return dataService.callBoards()
                    .then(function() {
                      return dataService.getBoards();
                    });
                }]
              }
            })
            .state('boards.index', {
              url: '',
              templateUrl: 'templates/boards/boardIndex.html'
            })
            .state('boards.show', {
              url: '/:id',
              templateUrl: 'templates/boards/boardShow.html',
              controller: 'BoardsShowCtrl',
              resolve: {
                board: ['dataService', '$stateParams',
                function(dataService, $stateParams) {
                  //return dataService.getBoards()[$stateParams.id];
                  return dataService.callBoardContent($stateParams.id)
                    .then(function() {
                      
                      return dataService.getBoard($stateParams.id);
                    });
                }]
              }
            });
        }])
    //Error Logging
    .run([ '$rootScope', function($rootScope){
      $rootScope.$on("$stateChangeError", console.log.bind(console));
    }])
    .run(['editableOptions', function(editableOptions) {
      editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    }]);
