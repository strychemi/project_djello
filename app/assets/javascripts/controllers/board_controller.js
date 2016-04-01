djello.controller('BoardCtrl',
  ["$scope",
  "Auth",
  'apiService',
  'data',
  function($scope, Auth, apiService, data){
    Auth.currentUser().then(function(user) {
      $scope.currentUser = user;
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
      }, function(error) {
      // unauthenticated error
        console.log(error);
    });
    console.log(data);
    $scope.data = data;
}]);
