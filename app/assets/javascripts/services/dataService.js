djello.factory('dataService',
  ['Restangular',
  function(Restangular){

    var _boards = [];

    var callBoards = function() {
        return Restangular.all('boards').getList()
        .then(
          function(data) {
            populateBoards(data);
          },
          function(error) {
            console.log("API call for all boards didn't work.");
          }
        );
    };

    var populateBoards = function(data) {
      _boards = [];
      data.forEach(function(board) {
        _boards.push(board);
      });
    };

    var getBoards = function() {
      return _boards;
    };

    var getBoard = function(boardId) {
      for (var index in _boards) {
        if (boardId == _boards[index].id) { return _boards[index]; }
      }
    };

    var createBoard = function() {
      return Restangular.all('boards').post();
    };

    var deleteBoard = function(boardId) {
      return Restangular.one('boards', boardId).remove();
    };

    var updateBoard = function(title, boardId) {
      var updatedBoard = {
        title: title
      };
      return Restangular.one('boards', boardId).patch(updatedBoard);
    };

    var callBoardContent = function(boardId) {
      return Restangular.one('boards', boardId).get()
      .then(
        function(response) {
          for (var index in _boards) {
            if (boardId == _boards[index].id) {
              _boards[index] = response;
            }
          }
        },
        function(error) {
          console.log("GET request for single board didn't work.");
        }
      );
    };

    var getLists = function(boardId) {
      return _boards[boardId].lists;
    };

    var getCards = function(boardId, listId) {
      return _boards[boardId][listId].cards;
    };

    var createList = function(boardId, title, description) {
      var listParams = {
        board_id: boardId,
        title: title,
        description: description
      };
      return Restangular.all('lists').post(listParams);
    };

    var deleteList = function(listId, boardId) {
      var listParams = {
        board_id: boardId
      };
      return Restangular.one('lists', listId).remove(listParams);
    };

    var updateList = function(boardId, listId, title, description) {
      var updatedList = {
        board_id: boardId
      };
      updatedList.title = title || updatedList.title;
      updatedList.description = description || updatedList.description;
      return Restangular.one('lists', listId).patch(updatedList);
    };

    var createCard = function(boardId, listId, title) {
      var cardParams = {
        board_id: boardId,
        list_id: listId,
        title: title
      };
      return Restangular.all('cards').post(cardParams);
    };

    var deleteCard = function(boardId, listId, cardId) {
      var cardParams = {
        board_id: boardId,
        list_id: listId
      };
      return Restangular.one('cards', cardId).remove(cardParams);
    };

    return {
      callBoards: callBoards,
      getBoards: getBoards,
      getBoard: getBoard,
      createBoard: createBoard,
      deleteBoard: deleteBoard,
      updateBoard: updateBoard,
      callBoardContent: callBoardContent,
      createList: createList,
      deleteList: deleteList,
      updateList: updateList,
      createCard: createCard,
      deleteCard: deleteCard
    };
}]);
