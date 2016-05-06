djello.controller('BoardsCtrl',
  ["$scope",
  "Auth",
  'boardData',
  'dataService',
  '$state',
  '_',
    function($scope, Auth, boardData, dataService, $state, _){
      $scope.boards = boardData;

      $scope.createBoard = function() {
        dataService.createBoard()
        .then(
          function(response) {
            $scope.boards.push(response);
            $state.go('boards.show', {id: response.id});
          },
          function(error){
            console.log("API call for creating a board didn't work.");
          }
        );
      };

      $scope.updateBoard = function(title, boardId) {
        return dataService.updateBoard(title, boardId)
        .then(
          function(response) {
            $scope.boards.forEach(function(element) {
              if (element.id == response.id) {
                element = response;
              }
            });
          },
          function(response) {
            console.log("API call for updating a board didn't work");
          }
        );
      };

      $scope.deleteBoard = function(boardId) {
        dataService.deleteBoard(boardId)
        .then(
          function(response) {
            for (var index in $scope.boards) {
              if (response.id == $scope.boards[index].id) {
                $scope.boards.splice(index, 1);
              }
            }
            $state.go('boards.index');
          },
          function(error) {
            console.log("API call for deleting a board didn't work.");
          }
        );
      };
}]);
