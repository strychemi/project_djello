djello.factory('apiService', ['Restangular', function(Restangular){

    var obj = {};
    obj.data = {};

    obj.getData = function(){
        return Restangular.all('boards').getList().then(function(data){
           //console.log("data from service:", data[0]);
           obj.data = data;
           return data;
       }, function(error){
           console.log("It didn't work");
       });
    };

    return obj;

}]);
