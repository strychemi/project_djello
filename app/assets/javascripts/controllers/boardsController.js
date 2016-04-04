djello.controller('BoardsCtrl',
  ["$scope",
  "Auth",
  'boardData',
  'dataService',
  '$state',
    function($scope, Auth, boardData, dataService, $state){
      $scope.boards = boardData;

      $scope.createBoard = function() {
        dataService.createBoard()
        .then(
          function(response) {
            $scope.boards[response.id] = response;
            $state.go('boards.show', {id: response.id});
          },
          function(error){
            console.log("API call for creating a board didn't work.");
          }
        );
      };

      $scope.deleteBoard = function(boardId) {
        dataService.deleteBoard(boardId)
        .then(
          function(response) {
            delete $scope.boards[response.id];
            $state.go('boards.index');
          },
          function(error) {
            console.log("API call for deleting a board didn't work.");
          }
        );

      };
}]);
