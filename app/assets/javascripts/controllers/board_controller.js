djello.controller('BoardCtrl',
  ["$scope",
  "Auth",
  'data',
  'apiService',
  function($scope, Auth, data, apiService){
    Auth.currentUser().then(function(user) {
      $scope.currentUser = user;
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
      }, function(error) {
      // unauthenticated error
        console.log(error);
    });

    $scope.boards = apiService.boards;
      console.log($scope.boards);
}]);
