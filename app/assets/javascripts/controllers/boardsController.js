djello.controller('BoardsCtrl',
  ["$scope",
  "Auth",
  'boardData',
    function($scope, Auth, boardData){
      $scope.boards = boardData;
}]);
