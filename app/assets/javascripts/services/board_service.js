djello.factory('boardService',
  ['Restangular',
  'apiService',
  function(Restangular, apiService){

    var obj = {};

    obj.boards = [];



    return obj;
}]);
