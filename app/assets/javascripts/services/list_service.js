djello.factory('listService', ['boardService', function(boardService){

    var obj = {};

    obj.getLists = function(board){
        return board['lists'];
    };

    return obj;

}]);