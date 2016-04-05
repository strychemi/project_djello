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

      $scope.updateBoard = function(title, board) {
        return dataService.updateBoard(title, board)
        .then(
          function(response) {
            $scope.boards[response.id].title = response.title;
            return true;
          },
          function(response) {
            console.log("API call for updating a board didn't work");
            return false;
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

      $scope.createList = function(boardId, title, description) {
        dataService.createList(boardId, title, description)
        .then(
          function(response) {
            $scope.boards[boardId].lists.push(response);
          },
          function(response) {
            console.log("API call for creating a List didn't work.");
          }
        );
      };

      $scope.deleteList = function(listId, boardId) {
        dataService.deleteList(listId, boardId)
        .then(
          function(response) {
            var lists = $scope.boards[boardId].lists;
            var listIndex;
            for (var i = 0; i < lists.length; i++) {
              if (lists[i].id === listId) {
                listIndex = i;
                break;
              }
            }
            lists.splice(listIndex, 1);
          },
          function(response) {
            console.log("API call for deleting a List didn't work.");
          }
        );
      };
}]);
