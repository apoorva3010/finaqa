/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('chargeController', function ($scope, $http, FrameworkConstants) {
    $scope.currentlyProcessing = false;
    $scope.hasModalError = false;
    $scope.hasModalSuccess = false;

    $scope.changeTotalAmt = function () {
        $scope.totalAmt = Math.round(parseFloat($scope.baseAmt) + parseFloat($scope.baseAmt * $scope.percentage / 100));
    };

    $scope.openPopup = function (id, baseAmt, percentage, totalAmt, desc) {
        $scope.hasModalError = false;
        $scope.hasModalSuccess = false;

        $scope.popupId = id;
        $scope.baseAmt = baseAmt;
        $scope.percentage = percentage;
        $scope.totalAmt = totalAmt;
        $scope.chargePopupHeader = desc;

        showChargesPopup();
        //hideChargesPopup();
        
    };

    $scope.saveClicked = function (isValid) {
        if (!isValid) {
            return;
        }
        $scope.currentlyProcessing = true;

        var data = {
            queryTypeId: $scope.popupId,
            baseAmt: $scope.baseAmt,
            totalAmt: $scope.totalAmt
        };
        var request = {
            data: angular.toJson(data)
        };
        $http({
            url: FrameworkConstants.baseUrl + "/admin/updateCharge",
            method: "POST",
            data: angular.toJson(request),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            //alert(JSON.stringify(response.data.data));
            $scope.currentlyProcessing = false;
            if (response.data.errorCode === 0) {
                //location.href = FrameworkConstants.baseUrl + '/(FrameworkConstantsconsultant/dashboard';
                $scope.successMsg = "Charges updated successfully";
                $scope.hasModalSuccess = true;
                window.location.href = FrameworkConstants.baseUrl + '/admin/charges';
            } else {
                //alert('Hello');
                $scope.hasModalError = true;
                $scope.errors = [];
                $scope.errors.push('Sorry could not update the amount');
            } //endif else

        }, function (err) {
            console.log(err);
            $scope.hasModalError = true;
            $scope.errors.push('Sorry some error occurred');
            $scope.currentlyProcessing = true;
        });
    };

    $scope.cancelClicked = function () {
        hideChargesPopup();
    };

});