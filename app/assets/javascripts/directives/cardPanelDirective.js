djello.directive('cardPanel', function() {
  return {
    templateUrl: "templates/directives/cardPanel.html",
    restrict: "E",
    scope: {
      board: "=",
      list: "=",
      card: "=",
      deleteCard: "&",
      editCard: "&",
      closeCard: "&"
    }
  };
});
