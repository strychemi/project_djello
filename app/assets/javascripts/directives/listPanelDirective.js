djello.directive('listPanel', function() {
  return {
    templateUrl: "templates/directives/listPanel.html",
    restrict: "E",
    link: function(scope) {
      var createCard = scope.createCard;
      scope.createCard = function(boardId, listId, title) {
        scope.newCardTitle = "";
        createCard(boardId, listId, title);
      };
    }
  };
});
