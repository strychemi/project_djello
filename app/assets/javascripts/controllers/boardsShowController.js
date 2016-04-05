djello.controller('BoardsShowCtrl',
  ['$scope', 'board', '$state', 'dataService',
    function($scope, board, $state, dataService){
      if (board) {
        $scope.board = board;
        $scope.lists = board.lists;
        $scope.cardForms = {};
        $scope.toggleCardForm = function(listId) {
          $scope.cardForms[listId] = !$scope.cardForms[listId];
        };

        $scope.createCard = function(boardId, listId, title) {
          dataService.createCard(boardId, listId, title)
          .then(
            function(response) {
              var lists = $scope.board.lists;
              var listIndex = _.findIndex(lists,
                function(el) { return el.id === listId; }
              );
              var cards = lists[listIndex].cards;
              cards.push(response);
              $scope.toggleCardForm(listId);
            },
            function(response) {
              console.log("API call for creating a Card didn't work.");
            }
          );
        };

      } else {
        $state.go("boards.index");
      }
}]);
