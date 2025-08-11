const app = angular.module("todoApp", []);

app.controller("TodoController", function ($scope) {
  $scope.message = "Angular JS 시작!";
  $scope.newTodo = "기본값";

  $scope.changeInput = function () {
    $scope.newTodo = "변경된 값 by 버튼";
  };

  $scope.todos = [{ text: "Angular 배우기" }, { text: "directives 배우기" }];

  $scope.addTodo = function () {
    if ($scope.todo) {
      $scope.todos.push({ text: $scope.todo });
      $scope.todo = "";
    }
  };

  $scope.removeTodo = function (index) {
    $scope.todos.splice(index, 1);
  };

  $scope.showOutputs = function () {
    console.log($scope);
  };
});

app.directive("myDirective", function () {
  /**
   * restrict : 디렉티브 사용 방식 지정
   * template : 해당 디렉티브가 렌더링할 HTML..?
   * link : 디렉티브가 DOM에 붙을 때 실행되는 함수. scope 와 element 를 조작가능.
   */
  return {
    restrict: "E", // E : Element, A : Attribute, C : Class, M : Comment
    template: "<div>커스텀 디렉티브 예제</div>",
    link: function (scope, element, attrs) {
      // DOM 조작 및 이벤트 해들링
    },
  };
});

app.directive("todoItem", function () {
  return {
    restrict: "E",
    scope: {
      todo: "=", // 부모 스코프 todo 객체를 바인딩 (?)
      onRemove: "&",
    },
    template: `<li>
    <input type="checkbox" ng-model="todo.done" />
    <span ng-class="{done: todo.done}">{{ todo.text }}</span>
    <button ng-click="handleRemove()">삭제</button>
  </li>`,
    link: function (scope, element, attrs) {
      scope.handleRemove = function () {
        alert(`삭제 클릭됨 : ${scope.todo.text}`);
        scope.onRemove();
      };
    },
  };
});
