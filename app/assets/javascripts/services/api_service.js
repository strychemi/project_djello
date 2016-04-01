djello.factory('apiService', ['Restangular', function(Restangular, boardService){

    var obj = {};
    obj.data = {};
    obj.boards = {};

    obj.getData = function(){
        return Restangular.all('boards').getList().then(function(data){
           //console.log("data from service:", data[0]);
           obj.data = data;
           obj.populateBoards();
           return data;
       }, function(error){
           console.log("It didn't work");
       });
    };

    obj.populateBoards = function(){
        obj.data.forEach(function(board){
            obj.boards[board.id] = board;
        });
    };

    return obj;
}]);
