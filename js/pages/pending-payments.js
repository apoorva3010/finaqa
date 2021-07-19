app.controller('pendingPaymentsController', function ($scope, $http, FrameworkConstants) {
    $scope.currentlyProcessing = false;
    
   //Call pending consultant withdrawal request list
    $scope.viewPendingPayments = function () {
        $http.get(FrameworkConstants.baseUrl + "/consultantPayments/getPendingPayments")
                .then(function (response) {
                    $scope.pendingRequests = JSON.parse(response.data.data);
                    $scope.showPendingRequestLoader = false;
                }, function (err) {
                    console.log(err);
                    $scope.showPendingRequestLoader = false;
                });
    };
    $scope.viewPendingPayments(); 
    
    
    $scope.initiatePayment = function (id,amount) {
        $scope.popupId = id;
        $scope.pendingAmount = amount;
        showTextPopup();
    };
    
    
    $scope.okPressed = function () {
        $scope.currentlyProcessing = true;
        var request = {
            data: angular.toJson({
                consultantId: $scope.popupId,
                pendingAmt: $scope.pendingAmount,
                bankTrnId: $scope.popupText})
        };
        $http({
            url: FrameworkConstants.baseUrl + '/consultantPayments/recordPayment',
            method: 'POST',
            data: angular.toJson(request)
        }).then(function (response) {
            if (response.data.errorCode != 0) {
                alert('Sorry some error occurred');
            }
            $scope.viewPendingPayments();
            $scope.currentlyProcessing = false;
            hideTextPopup();
        }, function (err) {
            console.log(err);
            $scope.currentlyProcessing = false;
        });
        $scope.popupText = "";
    };
});

