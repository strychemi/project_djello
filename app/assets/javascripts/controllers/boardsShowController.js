djello.controller('BoardsShowCtrl',
  ['$scope', 'dataService', '$stateParams',
    function($scope, dataService, $stateParams){
      $scope.board = dataService.getBoards()[$stateParams.id];
}]);
