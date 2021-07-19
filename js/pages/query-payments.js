/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('queryPaymentController', function ($scope, $http, FrameworkConstants) {
    'use strict';
    $scope.payments = [];
    $scope.pages = [];
    $scope.consultantList = [];
    $scope.currentPage = 1;
    $scope.showLoader = true;
    $scope.showViewLoader = true;
    $scope.selectedConsultant = null;

    $scope.updateView = function (pageNo) {
        $scope.showLoader = true;
        //alert($scope.selectedConsultant);
        $scope.loadMyPayments($scope.selectedConsultant, pageNo);
    };
    
    $scope.getPayments = function () {
        $scope.showLoader = true;
        $scope.loadMyPayments($scope.selectedConsultant, 1,$scope.searchInput);
    };

    $scope.loadMyPayments = function (consultantId, pageNo,searchText) {
        var appendString = "";
        if (pageNo != null) {
            appendString += "/" + pageNo;
        } else {
            appendString += "/1";
        }
        if (consultantId != null) {
            appendString += "/" + consultantId;
        }else {
            appendString += "/null";
        }
        if (searchText != null) {
            appendString += "/" + searchText;
        }

        $http.get(FrameworkConstants.baseUrl + '/admin/myPayments' + appendString)
            .then(function (response) {
                $scope.showLoader = false;
                if (response.data.errorCode == 0) {
                    var serverResponse = JSON.parse(response.data.data);
                    $scope.payments = serverResponse.recordList;
                    $scope.currentPage = serverResponse.currentPage;
                    $scope.totalRecords = serverResponse.totalRecords;
                    $scope.totalPages = serverResponse.totalPages;
                    for (var iPages = 1; iPages <= $scope.totalPages; iPages++) {
                        $scope.pages.push(iPages);
                    }
                } else {
                    $scope.payments = [];
                    $scope.currentPage = 1;
                    $scope.totalRecords = 0;
                }
            }, function (err) {
                console.log(err);
                $scope.showLoader = false;
            });
    };

    $scope.loadMyPayments();

    $http.get(FrameworkConstants.baseUrl + '/consultant/getList')
        .then(function (response) {
            $scope.showViewLoader = false;
            if (response.data.errorCode == 0) {
                var serverResponse = JSON.parse(response.data.data);
                $scope.consultantList = serverResponse;
            }
        }, function (err) {
            console.log(err);
            $scope.showViewLoader = false;
        });

    $scope.showInfo = function (queryId) {
        if ($('#div-' + queryId).html() != '') {
            $('#div-' + queryId).html('');
            return;
        }
        $http.get(FrameworkConstants.baseUrl + '/queryHeader/getCustConsultantInfo/' + queryId)
            .then(function (response) {
                $scope.showLoader = false;
                var info = JSON.parse(response.data.data);
                if (response.data.errorCode == 0) {
                    $('#div-' + queryId).html('<div class="user-info-area"><span class="consultant_nm"><i class="fa fa-address-book-o p-r-7"></i>' + info.consultantName + '</span><span class="customer_nm"><i class="fa fa-user p-r-7"></i>' + info.custName + '</span></div>');
                }
            }, function (err) {
                console.log(err);
                $scope.showLoader = false;
            });
    };
});
