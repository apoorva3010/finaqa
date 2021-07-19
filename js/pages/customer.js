app.controller('customerController', function ($scope, $http, FrameworkConstants) {
    'use strict';
    
    $scope.showLoader = true;
    $scope.showMainLoader = false;
    
    $scope.getCustomerList = function (pageNo) {
        $scope.showLoader = true;
        
        var customerListObject = {
            pageNo: pageNo,
            searchText: $scope.searchInput
        };
        var mainData = {
            data: JSON.stringify(customerListObject)
        };
        $http({
            url: FrameworkConstants.baseUrl + "/admin/customerList",
            method: "POST",
            data: JSON.stringify(mainData),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            if (response.data.errorCode === 0) {
                $scope.customerList = JSON.parse(response.data.data);
                $scope.recordList = $scope.customerList.recordList;
                
            } else if(response.data.errorCode == 246){
                window.location.href = FrameworkConstants.baseUrl + '/admin/login';
            }else{
                //alert('Hello');
                $scope.hasError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);
            }
            $scope.showLoader = false;
        }, function (err) {
            console.log(err);
            $scope.showLoader = false;
        });
        

    };

    $scope.getCustomerList(1);
});
