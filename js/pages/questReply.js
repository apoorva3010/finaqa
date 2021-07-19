app.controller(
  "questionReplyCtrl",
  function ($scope, $http, FrameworkConstants) {
    "use strict";
    $scope.showButtons = true;
    //This will hide the DIV by default.
    $scope.isVisibleInfo = false;
    $scope.meetingOptionsShow = true;
    $scope.meetingOptionDate = "";
    $scope.meetingOptionStartTime = "";
    $scope.meetingOptionEndTime = "";
    $scope.meetingOptionUrl = "";
    $scope.showInfo = function () {
      //If DIV is visible it will be hidden and vice versa.
      $scope.isVisibleInfo = $scope.isVisibleInfo ? false : true;
    };

    $scope.closeQuery = function () {
      $scope.confirmationText =
        "Please note, closing this question will stop all the further communication with consultant! \n Do you really want to do that?";
      showTextPopup();
      //showpopup();
    };

    $scope.closeAdminQuery = function () {
        $scope.confirmationText =
                "Please note, closing this question will stop all the further communication with consultant! \n Do you really want to do that?";
        //showTextPopup();
        showpopup();
    };
    
    $scope.acceptMeeting = function (meetingId) {
      var data = {
        meetingId: meetingId,
      };

      $http({
        url: FrameworkConstants.baseUrl + "/consultant/apiAcceptMeeting",
        method: "POST",
        data: angular.toJson(data),
        headers: {
          Accept: "application/json",
        },
      }).then(function (response) {
        //$scope.sendCustomerFeedback();
        if (response.data.errorCode != 0) {
          $scope.hasError = true;
          $scope.errors = [];
          $scope.errors.push(response.data.message);
        } else {
          var jsonData = JSON.parse(response.data.data);
          $scope.meetingOptionDate = jsonData.meetingDate;
          $scope.meetingOptionStartTime = jsonData.meetingStartTime;
          $scope.meetingOptionEndTime = jsonData.meetingEndTime;
          $scope.meetingOptionsShow = false;
          $scope.meetingOptionUrl = jsonData.meetingUrl;
        }
      });
    };

    $scope.confirmYes = function () {
      var data = {
        queryId: $scope.queryId,
      };

      $http({
        url: FrameworkConstants.baseUrl + "/queryHeader/apiWebCloseQuery",
        method: "POST",
        data: angular.toJson(data),
        headers: {
          Accept: "application/json",
        },
      }).then(function (response) {
        //$scope.sendCustomerFeedback();
        if (response.data.errorCode != 0) {
          $scope.hasError = true;
          $scope.errors = [];
          $scope.errors.push(response.data.message);
        } else {
          $scope.sendCustomerFeedback();
          $scope.showButtons = false;
          //$scope.submissionResponse = JSON.parse(response.data.data);
          //window.location.href = FrameworkConstants.baseUrl + '/';
        }
        hidepopup();
      });
    };

    $scope.sendCustomerFeedback = function () {
      //alert($("#rating-input").val());
      var queryData = {
        queryId: $scope.queryId,
        rating: $("#rating-input").val(),
      };
      var request = {
        data: angular.toJson(queryData),
      };

      $http({
        url: FrameworkConstants.baseUrl + "/queryHeader/provideFeedback",
        method: "POST",
        data: angular.toJson(request),
        headers: {
          Accept: "application/json",
        },
      }).then(function (response) {
        if (response.data.errorCode != 0) {
          $scope.hasError = true;
          $scope.errors = [];
          $scope.errors.push(response.data.message);
        } else {
          //$scope.showButtons = false;
          //$scope.submissionResponse = JSON.parse(response.data.data);
          //window.location.href = FrameworkConstants.baseUrl + '/';
        }
      });
    };

    $scope.okPressed = function () {
      //alert($("#rating-input").val());

      hideTextPopup();
      showpopup();
    };
  }
);
