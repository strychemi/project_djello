djello.controller('BoardCtrl',
  ["$scope", "Auth", function($scope, Auth){
    Auth.currentUser().then(function(user) {
      $scope.currentUser = user;
        // User was logged in, or Devise returned
        // previously authenticated session.
        console.log(user); // => {id: 1, ect: '...'}
      }, function(error) {
      // unauthenticated error
        console.log(error);
    });
}]);
