///*
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
//
var app = angular.module(
  "finaqa-app",
  ["ui.select2", "clearDataModule"] /*['ngPopover']*/
);
//app.config(function ($locationProvider) {
("use strict");
//    $locationProvider.html5Mode({
//        enabled: true,
//        requireBase: false
//    });

/*$routeProvider
            .when('/', {
                templateUrl: '/partials/template1.html',
                controller: 'ctrl1'
            })
            .when('/tags/:tagId', {
                templateUrl: '/partials/template2.html',
                controller: 'ctrl2'
            })
            .when('/another', {
                templateUrl: '/partials/template1.html',
                controller: 'ctrl1'
            })
            .otherwise({redirectTo: '/'});*/
//});
//$locationProvider.html5Mode(true).hashPrefix('*');
app.factory("FrameworkConstants", function () {
  return {
    baseUrl: "",
    //imageUrl: '/images'
  };
});

app.filter("range", function () {
  return function (input, total) {
    total = parseInt(total);

    for (var i = 0; i < total; i++) {
      input.push(i);
    }

    return input;
  };
});

//derective for numbers only in input box

app.directive("numbersOnly", function () {
  return {
    require: "ngModel",
    link: function (scope, element, attr, ngModelCtrl) {
      function fromUser(text) {
        if (text) {
          var transformedInput = text.replace(/[^0-9-]/g, "");
          if (transformedInput !== text) {
            ngModelCtrl.$setViewValue(transformedInput);
            ngModelCtrl.$render();
          }
          return transformedInput;
        }
        return undefined;
      }
      ngModelCtrl.$parsers.push(fromUser);
    },
  };
});
