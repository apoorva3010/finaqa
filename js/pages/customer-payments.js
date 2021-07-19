/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('customerPaymentController', function ($scope, $http, FrameworkConstants) {
    $scope.showMainLoader = true;
    $scope.payments = [];

    $http({
        url: FrameworkConstants.baseUrl + "/customerPayment/payments",
        method: "GET",
        headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
        //alert(JSON.stringify(response.data.data));

        if (response.data.errorCode === 0) {
            //location.href = FrameworkConstants.baseUrl + '/(FrameworkConstantsconsultant/dashboard';
            var data = JSON.parse(response.data.data);
            $scope.payments = data;
            

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

});