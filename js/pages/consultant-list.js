/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('consultantListController', function ($scope, $http, FrameworkConstants) {
    'use strict';
    $scope.selectedConsultant = -1;
    $scope.selectedCategory = 0;
    //$scope.questionList = [];
    $scope.showPopupLoader = false;
    $scope.chosenSubcategory = null;
    $scope.subcategoryList = [];
    $scope.categoryList = [];
    $scope.selectedSubcategory = false;
    $scope.showLoader = true;
    $scope.errMsg = null;
    $scope.forwardQuestionId = -1;
    $scope.pendingQueries = [];
    $scope.showPendingRequestLoader = true;
    $scope.selected = {};
    $scope.showQueryLoader = true;

    //Constructor loading 
    $http.get(FrameworkConstants.baseUrl + "/admin/pendingQueries")
            .then(function (response) {
                //alert(response.data.data);
                $scope.pendingQueries = JSON.parse(response.data.data);
                //alert($scope.pendingQueries.length);
                $scope.showQueryLoader = false;
            }, function (err) {
                console.log(err);
                $scope.showQueryLoader = false;
            });

    //Call at the initial level, to get all categories from DB
    $http.get(FrameworkConstants.baseUrl + "/skillCategoryMaster/categories")
            .then(function (response) {
                $scope.categoryList = JSON.parse(response.data.data);
                $scope.showLoader = false;
            }, function (err) {
                console.log(err);
                $scope.showLoader = false;
            });

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

    $scope.changeCategory = function () {
        $scope.showLoader = true;
        $scope.errMsg = null;
        $http.get(FrameworkConstants.baseUrl + "/skillSubcategoryMaster/subCategories", {
            params: {
                categoryId: $scope.selectedCategory
            },
            headers: {
                'Accept': 'application/json'
            }
        }).then(function (response) {
            $scope.selectedSubcategory = true;
            $scope.subcategoryList = JSON.parse(response.data.data);
            $scope.showLoader = false;
            $scope.chosenSubcategory = {'subCatId': -1};
        }, function (err) {
            console.log(err);
        });

    };

    $scope.searchConsultants = function () {
        var subCatText = null;
        if ($scope.chosenSubcategory.subCatId != -1) {
            subCatText = '/' + $scope.chosenSubcategory.subCatId;
        }
        $http.get(FrameworkConstants.baseUrl + "/consultant/listConsultants/" + $scope.selectedCategory + subCatText, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(function (response) {
            $scope.consultantList = JSON.parse(response.data.data);
        }, function (err) {
            console.log(err);
        });
    };

    $scope.finalizeConsultant = function () {
        $scope.showPopupLoader = true;
        if ($scope.consultantList != null) {
            for (var iCounter = 0; iCounter < $scope.consultantList.length; iCounter++) {
                if ($scope.consultantList[iCounter].id == $scope.selected[ $scope.consultantList[iCounter].id]) {
                    $scope.selectedConsultant = $scope.consultantList[iCounter].id;
                    //alert($scope.selectedConsultant); 
                    break;
                }
            }
        }

        if ($scope.selectedConsultant == -1) {
            $scope.errMsg = 'Please select at least one consultant';
            $scope.showPopupLoader = false;
        } else {
            var url = "/queryHeader/assignConsultant/" + $scope.forwardQuestionId + '/' + $scope.selectedConsultant;
            $http.get(FrameworkConstants.baseUrl + url, {
                headers: {
                    'Accept': 'application/json'
                }
            }).then(function (response) {
                $scope.showPopupLoader = false;
                //$scope.consultantList = JSON.parse(response.data.data);
                $scope.searchQueries();
                $('.close').click();
                $scope.errMsg = null;
                $scope.consultantList = null;
            }, function (err) {
                console.log(err);
            });
            //alert($scope.forwardQuestionId);
        }
        //alert($scope.consultantDetails.selected);
    };

    $scope.searchQueries = function () {
        $http.get(FrameworkConstants.baseUrl + "/admin/pendingQueries")
                .then(function (response) {
                    //alert(response.data.data);
                    $scope.pendingQueries = JSON.parse(response.data.data);
                    //alert($scope.pendingQueries.length);
                    $scope.showLoader = false;
                }, function (err) {
                    console.log(err);
                });
    };

    $scope.forwardToQuestion = function (queryId, queryTitle) {
        //alert(queryId);
        $scope.forwardQuestionId = queryId;
        $scope.questionTitle = queryTitle;
    };

    $scope.initiateDelete = function (name, id) {
        $scope.confirmationText = "Are you sure you want to delete withdrawal request from " + name;
        $scope.popupId = id;
        showpopup();
    };

    $scope.initiatePayment = function (id) {
        $scope.popupId = id;
        showTextPopup();
    };

    $scope.confirmYes = function () {
        $scope.currentlyProcessing = true;
        $http.get(FrameworkConstants.baseUrl + "/consultantPayments/deleteRequest/" + $scope.popupId)
                .then(function (response) {
                    if (response.data.errorCode != 0) {
                        alert('Sorry some error occurred');
                    }
                    $scope.currentlyProcessing = false;
                    $scope.popupId = 0;
                    hidepopup();
                    $scope.viewPendingPayments();
                }, function (err) {
                    console.log(err);
                    $scope.currentlyProcessing = false;
                });
    };

    $scope.okPressed = function () {
        $scope.currentlyProcessing = true;
        var request = {
            data: angular.toJson({
                historyId: $scope.popupId,
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

    //WATCH list
    $scope.$watch(function () {
        $('.selectcategory').selectpicker('refresh');
        $('.selectsubcategory').selectpicker('refresh');
    });

});