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
      Restangular.all('boards').getList()
      .then(
        function(data) {
          _rawData = data;
          populateBoards();
        }, function(error){
          console.log("API call for all boards didn't work.");
     });
    };

    return {
      callAllBoardsData: callAllBoardsData,
      getBoards: getBoards
    };
}]);
