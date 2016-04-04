djello.controller('BoardsCtrl',
  ["$scope",
  "Auth",
  'boardData',
  'dataService',
    function($scope, Auth, boardData, dataService){
      $scope.boards = boardData;
      $scope.createBoard = function() {
        dataService.createBoard();
      };
}]);
