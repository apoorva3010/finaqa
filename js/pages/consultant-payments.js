/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('paymentController', function ($scope, $http, FrameworkConstants) {
    $scope.showMainLoader = true;
    $scope.payments = [];

    $http({
        url: FrameworkConstants.baseUrl + "/consultantPayments/getPayments",
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
        //alert(JSON.stringify(response.data.data));

        if (response.data.errorCode === 0) {
            //location.href = FrameworkConstants.baseUrl + '/(FrameworkConstantsconsultant/dashboard';
            var data = JSON.parse(response.data.data);
            $scope.payments = data.historyDetails;
            $scope.amtPending = data.amtPending;

        } else {
            //alert('Hello');
            $scope.hasError = true;
            $scope.errors = [];
            $scope.errors.push('Sorry could not save data');
        } //endif else
        $scope.showMainLoader = false;
    }, function (err) {
        console.log(err);
        $scope.hasError = true;
        $scope.errors.push('Sorry some error occurred');
        $scope.showMainLoader = false;
    });

//    $scope.requestWithdrawal = function (isValid, event) {
//        if ($scope.withdrawalAmt > $scope.amtPending) {
//            $scope.hasModalError = true;
//            $scope.errors.push('Requested amount cannot be more than amount pending to be withdrawn');
//            return;
//        }
//
//        var data = {
//            amount: $scope.withdrawalAmt
//        };
//        var request = {
//            data: JSON.stringify(data)
//        };
//        
//        $http({
//            url: FrameworkConstants.baseUrl + "/consultantPayments/withdrawAmt",
//            method: "POST",
//            data: angular.toJson(request),
//            headers: {'Content-Type': 'application/json'}
//        }).then(function (response) {
//            //alert(JSON.stringify(response.data.data));
//
//            if (response.data.errorCode === 0) {
//                //location.href = FrameworkConstants.baseUrl + '/(FrameworkConstantsconsultant/dashboard';
//                $scope.successMsg = "Your request for withdrawal has been successfully sent, please wait for the confirmation email from FinaQA";
//                $scope.hasModalSuccess = true;
//            } else {
//                //alert('Hello');
//                $scope.hasModalError = true;
//                $scope.errors = [];
//                $scope.errors.push('Sorry withdrawal request failed');
//            } //endif else
//            $scope.showMainLoader = false;
//        }, function (err) {
//            console.log(err);
//            $scope.hasModalError = true;
//            $scope.errors.push('Sorry some error occurred');
//            $scope.showMainLoader = false;
//        });
//    };
});