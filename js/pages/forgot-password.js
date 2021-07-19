/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('forgotPasswordController', function ($scope, $http, FrameworkConstants) {
    $scope.emailId = null;
    $scope.forgotPassword = function (isValid, event) {
        event.preventDefault();
        
        var data = {
            emailId: $scope.emailId,
            loginType: $scope.loginType
        };
        var request = {
            data: angular.toJson(data)
        }
        $scope.processing = true;
        $http({
            url: FrameworkConstants.baseUrl + "/common/apiForgotPassword",
            method: "POST",
            data: angular.toJson(request),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            //alert(response.data.message);

            if (response.data.errorCode == 0) {
                $scope.hasSuccess = true;
                $scope.successMsg = response.data.message;
                $('#fogotpasswordModal').modal('toggle');
            } else {
                //alert('Hello');
                $scope.hasError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);
            } //endif else
            $scope.emailId = null;
            //$scope.showMainLoader = true;
            $scope.processing = false;
        }, function (err) {
            console.log(err);
        });
    };
});
