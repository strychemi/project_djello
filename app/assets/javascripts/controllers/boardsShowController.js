djello.controller('BoardsShowCtrl',
  ['$scope', 'board', '$state', 'dataService', 'ModalService', '_',
    function($scope, board, $state, dataService, ModalService, _){
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

        $scope.deleteCard = function(boardId, listId, cardId) {
          console.log(boardId, listId, cardId);
          dataService.deleteCard(boardId, listId, cardId)
          .then(
            function (response) {
              var lists = $scope.board.lists;
              var listIndex = _.findIndex(lists,
                function(el) { return el.id === listId; }
              );
              var cards = lists[listIndex].cards;
              var cardIndex = _.findIndex(cards,
                function(el) { return el.id === cardId; }
              );
              cards.splice(cardIndex,1);
            },
            function (response) {
              console.log("API call for deleting a Card didn't work.");
            }
          );
        };

        $scope.updateCard = function(boardId, listId, cardId) {
          ModalService.showModal({
            templateUrl: "templates/modals/cardModal.html",
            controller: "cardModalCtrl"
          }).then(function(modal) {
            // it's a bootstrap element, use 'modal' to show it
            modal.element.modal();
            modal.close.then(
              function(result) {
                console.log("CLOSED", result);
            });
          });
        };

      } else {
        $state.go("boards.index");
      }
}]);
