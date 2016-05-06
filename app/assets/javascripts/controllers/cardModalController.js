djello.controller('cardModalCtrl',
  ['$scope', '$element', 'close', 'boardId', 'listId', 'cardId', 'dataService',
    function($scope, $element, close, boardId, listId, cardId, dataService){
      // $scope.current = {
      //   board: dataService.getBoard(boardId),
      //   list: dataService.getLists(listId),
      //   card: cardId
      // };

      //  This close function doesn't need to use jQuery or bootstrap, because
      //  the button has the 'data-dismiss' attribute.
      $scope.close = function(result) {
        // close, but give 500ms for bootstrap to animate.
        // close returns a promise passing result as a parameter
        close(result, 500);
      };

      //  This cancel function must use the bootstrap, 'modal' function because
      //  the doesn't have the 'data-dismiss' attribute.
      $scope.cancel = function(result) {
        //  Manually hide the modal.
        $element.modal('hide');
        //  Now call close, returning control to the caller.
        close(result, 500);
      };
}]);
