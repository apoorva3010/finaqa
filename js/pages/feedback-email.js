/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('feedbackController', function ($scope, $http, FrameworkConstants) {
    //$scope.emailId = null;
    $scope.hasSuccess = false;
    $scope.hasError = false;
    $scope.processing = false;
    $scope.sendFeedback = function (event) {
        $scope.hasSuccess = false;
        $scope.hasError = false;
        $scope.processing = true;
        event.preventDefault();
//        if (!isValid) {
//            return;
//        }

        if ($scope.userId === null || $scope.loginType === null) {
            alert('sorry, invalid user information, please try again');
            return;
        }

        var data = {
            message: $scope.message,
            userId: $scope.userId,
            loginType: $scope.loginType
        };
        var request = {
            data: angular.toJson(data)
        }
        $scope.processing = true;
        $http({
            url: FrameworkConstants.baseUrl + "/common/apiSendFeedback",
            method: "POST",
            data: angular.toJson(request),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            //alert(response.data.message);

            if (response.data.errorCode == 0) {
                $scope.hasSuccess = true;
                $scope.successMsg = response.data.message;
            } else {
                //alert('Hello');
                $scope.hasError = true;
                $scope.errorMsg = response.data.message;
            } //endif else
            $scope.message = "";
            //$scope.showMainLoader = true;
            $scope.processing = false;
        }, function (err) {
            console.log(err);
            $scope.processing = false;
        });
    };
});
