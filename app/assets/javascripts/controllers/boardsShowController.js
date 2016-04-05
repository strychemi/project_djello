djello.controller('BoardsShowCtrl',
  ['$scope', 'board', '$state',
    function($scope, board, $state){
      if (board) {
        $scope.board = board;
        $scope.lists = board.lists;
        
      } else {
        $state.go("boards.index");
      }
}]);
