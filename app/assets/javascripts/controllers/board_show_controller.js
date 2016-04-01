djello.controller('BoardShowCtrl', ['$scope', '$stateParams', 'apiService', function($scope, $stateParams, apiService){
    console.log
    $scope.board = apiService.boards[$stateParams.id]

}]);