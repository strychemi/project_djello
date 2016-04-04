djello.controller('BoardsShowCtrl',
  ['$scope', 'board', '$state',
    function($scope, board, $state){
      if (board) {
        $scope.board = board;
      } else {
        $state.go("boards.index");
      }
}]);
