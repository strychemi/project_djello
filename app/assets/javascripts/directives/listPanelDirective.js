djello.directive('listPanel', function() {
  return {
    templateUrl: "templates/directives/listPanel.html",
    restrict: "E",
    scope: {
      board: "=",
      list: "=",
      cardForms: "=",
      toggleCardForm: "&",
      deleteList: "&",
      createCard: "&",
      updateList: "&"
    }
  };
});
