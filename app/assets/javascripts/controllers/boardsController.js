djello.controller('BoardsCtrl',
  ["$scope",
  "Auth",
  'boardData',
  function($scope, Auth, boardData){
    Auth.currentUser().then(function(user) {
      $scope.currentUser = user;
        // User was logged in, or Devise returned
        // previously authenticated session.
        //console.log(user); // => {id: 1, ect: '...'}
      }, function(error) {
      // unauthenticated error
        console.log(error);
    });

  $scope.boards = boardData;
}]);
