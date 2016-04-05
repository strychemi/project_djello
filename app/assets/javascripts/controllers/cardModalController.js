djello.controller('cardModalCtrl',
  ['$scope','close',
    function($scope, close){
      // $scope.currentBoard
      // $scope.currentList
      // $scope.currentCard
      $scope.close = function(result) {
        close(result, 500);
      };
}]);
