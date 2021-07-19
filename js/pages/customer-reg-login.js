/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller(
  "customerLoginController",
  function ($scope, $http, $location, FrameworkConstants) {
    "use strict";
    $scope.indiaSelected = false;
    $scope.city = "";
    $scope.indiaCity = "";

    $scope.submitLoginForm = function (isValid) {
      if (!isValid) {
        //alert('Not valid');
        return;
      }

      var loginObject = {
        emailId: $scope.emailId,
        password: $scope.password,
      };
      var mainData = {
        data: JSON.stringify(loginObject),
      };
      //alert($location.path());

      $http({
        url: FrameworkConstants.baseUrl + "/customer/apiWebCustLogin",
        method: "POST",
        data: JSON.stringify(mainData),
        headers: { "Content-Type": "application/json" },
      }).then(
        function (response) {
          //alert(JSON.stringify(response.data.errorCode));

          if (response.data.errorCode === 0) {
            //location.href = FrameworkConstants.baseUrl + '/(FrameworkConstantsconsultant/dashboard';

            if (!$scope.$$phase) {
              $location.path("/customer-dashboard");
              $scope.$apply();
            } else {
              //alert()
              window.location.href =
                FrameworkConstants.baseUrl + "/customer/questionList";
            }
          } else {
            //alert('Hello');
            $scope.hasError = true;
            $scope.errors = [];
            $scope.errors.push("Sorry! Credentials could not be authenticated");
          }
        },
        function (err) {
          console.log(err);
        }
      );
    };

    $scope.changeCountry = function () {
      if ($scope.country === "IN") {
        $scope.indiaSelected = true;
      } else {
        $scope.indiaSelected = false;
      }
    };

    $scope.saveCustomer = function (isValid, event) {
      if (!isValid) {
        event.preventDefault();
      }
    };
    $scope.getCity = function () {
      $scope.city = $scope.indiaCity;
    };

    $scope.submitRegForm = function (isValid) {
      var dt = new moment();
      var dtEntered = moment($scope.dob);
      var years = dt.diff(dtEntered, "years");
      if (years < 18) {
        $scope.hasRegistrationError = true;
        $scope.errors = [];
        $scope.errors.push("Sorry the minimum age is 18 years");
        return;
      }
      //alert($days);

      var registrationDetails = {
        customerName: $scope.customerName,
        emailId: $scope.emailId,
        phone: $scope.phone,
        dob: $scope.dob,
        gender: $scope.gender,
        residentStatus: $scope.residentStatus,
        operatedAs: $scope.operatedAs,
        password: $scope.password,
        country: $scope.country,
        city: $scope.city,
        zipcode: $scope.zipcode,
        occupation: $scope.occupation,
        skypeid: $scope.skypeid,
      };
      var mainData = {
        data: JSON.stringify(registrationDetails),
      };
      //alert(mainData);

      $http({
        url: FrameworkConstants.baseUrl + "/customer/apiCustRegister",
        method: "POST",
        data: mainData,
        headers: { "Content-Type": "application/json" },
      }).then(
        function (response) {
          if (response.data.errorCode === 0) {
            window.location.href =
              FrameworkConstants.baseUrl + "/customer/login";
          } else {
            //alert('Hello');
            $scope.hasRegistrationError = true;
            $scope.errors = [];
            $scope.errors.push(response.data.message);
          }
        },
        function (err) {
          console.log(err);
        }
      );
    };
  }
);
