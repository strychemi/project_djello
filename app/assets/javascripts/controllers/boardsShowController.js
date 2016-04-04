djello.controller('BoardsShowCtrl',
  ['$scope', 'boardService', '$stateParams',
    function($scope, boardService, $stateParams){
      $scope.board = boardService.getBoards()[$stateParams.id];
}]);
