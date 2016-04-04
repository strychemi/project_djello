djello.controller('BoardShowCtrl', ['$scope', '$stateParams', 'apiService', function($scope, $stateParams, apiService){
  // if user refreshes the show page, stateParams isn't set up
  // so make another API call
  if (!apiService.boards[$stateParams.id]) {
    $scope.board = apiService.boards[$stateParams.id];
  } else {
    console.log("testing");
  }
}]);
