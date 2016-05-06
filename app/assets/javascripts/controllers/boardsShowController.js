djello.controller('BoardsShowCtrl',
  ['$scope', 'board', '$state', 'dataService', 'ModalService', '_',
    function($scope, board, $state, dataService, ModalService, _){
      $scope.board = board;
      $scope.cardForms = {};
      $scope.toggleCardForm = function(listId) {
        $scope.cardForms[listId] = !$scope.cardForms[listId];
      };

      $scope.createList = function(boardId, title, description) {
        dataService.createList(boardId, title, description)
        .then(
          function(response) {
            $scope.board.lists.push(response);
          },
          function(response) {
            console.log("API call for creating a List didn't work.");
          }
        );
      };

      $scope.updateList = function(boardId, listId, title, description) {
        dataService.updateList(boardId, listId, title, description)
        .then(
          function(response) {
            var list = _.find($scope.board.lists, function(el) {
              return el.id == response.id;
            });
            list.title = title || list.title;
            list.description = description || list.description;
          },
          function(response) {
            console.log("API call for deleting a List didn't work.");
          }
        );
      };

      $scope.deleteList = function(listId, boardId) {
        dataService.deleteList(listId, boardId)
        .then(
          function(response) {
            var lists =  $scope.board.lists;
            for (var index in lists) {
              if (lists[index].id == response.id) {
                lists.splice(index, 1);
              }
            }
          },
          function(response) {
            console.log("API call for deleting a List didn't work.");
          }
        );
      };

      $scope.createCard = function(boardId, listId, title) {
        dataService.createCard(boardId, listId, title)
        .then(
          function(response) {
            var list = _.find($scope.board.lists, function(el) {
              return el.id == listId;
            });
            list.cards.push(response);
            $scope.toggleCardForm(listId);
          },
          function(response) {
            console.log("API call for creating a Card didn't work.");
          }
        );
      };

      $scope.deleteCard = function(boardId, listId, cardId) {
        dataService.deleteCard(boardId, listId, cardId)
        .then(
          function (response) {
            var list = _.find($scope.board.lists, function(el) {
              return el.id == listId;
            });
            for (var index in list.cards) {
              if (list.cards[index].id == response.id) {
                list.cards.splice(index, 1);
              }
            }
          },
          function (response) {
            console.log("API call for deleting a Card didn't work.");
          }
        );
      };

      $scope.updateCard = function(boardId, listId, cardId) {
        ModalService.showModal({
          templateUrl: "templates/modals/cardModal.html",
          controller: "cardModalCtrl",
          // passing parameters to cardModalCtrl
          inputs: {
            boardId: boardId,
            listId: listId,
            cardId: cardId
          }
        }).then(function(modal) {
          // it's a bootstrap element, use 'modal' to show it
          modal.element.modal();
          modal.close.then(
            function(result) {
              console.log("CLOSED", result);
          });
        });
      };
}]);
