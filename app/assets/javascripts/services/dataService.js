djello.factory('dataService',
  ['Restangular',
  function(Restangular){

    var _rawData = {};
    var _boards = {};

    var callAllBoardsData = function() {
        return Restangular.all('boards').getList()
        .then(
          function(data) {
            _rawData = data;
            populateBoards();
          }, function(error){
            console.log("API call for all boards didn't work.");
       });
    };

    var populateBoards = function() {
      _rawData.forEach(function(board) {
        _boards[board.id] = board;
      });
    };

    var getBoards = function() {
      return _boards;
    };

    var getLists = function(boardId) {
      return _boards[boardId].lists;
    };

    var getCards = function(boardId, listId) {
      return _boards[boardId][listId].cards;
    };

    var createBoard = function() {
      return Restangular.all('boards').post();
    };

    var deleteBoard = function(boardId) {
      return Restangular.one('boards', boardId).remove();
    };

    var updateBoard = function(title, board) {
      var updatedBoard = {
        title: title
      };
      return Restangular.one('boards', board.id).patch(updatedBoard);
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
      console.log(listParams);
      return Restangular.one('lists', listId).remove(listParams);
    };

    return {
      callAllBoardsData: callAllBoardsData,
      getBoards: getBoards,
      createBoard: createBoard,
      deleteBoard: deleteBoard,
      updateBoard: updateBoard,
      createList: createList,
      deleteList: deleteList
    };
}]);
