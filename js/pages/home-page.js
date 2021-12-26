/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//$mainModule = angular.module('mainModule', []);
app.controller('mainController', function ($scope, $http, FrameworkConstants) {
    'use strict';
    $scope.selectedCategory = 0;
    $scope.subcategoryList = [];
    $scope.categoryList = [];
    $scope.selectedSubcategory = false;
    $scope.showSuccessMsg = false;
    $scope.btnDisabled = false;
    $scope.showLoader = true;
    $scope.purposeSelect = "";
    
    
    
    //Call at the initial level, to get all categories from DB
    $http.get(FrameworkConstants.baseUrl + "/skillCategoryMaster/categories")
            .then(function (response) {
                $scope.categoryList = JSON.parse(response.data.data);
                $scope.showLoader = false;
            }, function (err) {
            });


    $scope.changeCategory = function () {
        $scope.showLoader = true;
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
        }, function (err) {

        });

    };

    $scope.submitForm = function (isValid) {
        if (!isValid) {
            //alert('Thanks for submitting form');
            return;
        }
        $scope.showSuccessMsg = true;
        $scope.btnDisabled = true;
        var data = {
            Name: $scope.firstName + " " + $scope.lastName,
            Phone: $scope.phoneNo,
            Email: $scope.email,
            Message: $scope.message,
            Topic: $scope.purposeSelect
        };
        var request = {
            data: angular.toJson(data)
        };

        $http({
            url: "http://35.225.98.207:3000/api/EmailSmsNotifies/contactUs",
            method: "POST",
            data: angular.toJson(data),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            // alert(JSON.stringify(response));

            if (response) {
                $scope.successMsg = response.data.message;
                $scope.hasSuccess = true;
                $scope.showSuccessMsg = false;
                $scope.btnDisabled = false;
                $scope.firstName = '';
                $scope.lastName = '';
                $scope.email = '';
                $scope.phoneNo = '';
                $scope.message = '';
                $(".purposeselect").val('default');
                $(".purposeselect").selectpicker('refresh');
                $(".choose-perpose").removeClass('has-success');
                $(".choose-perpose").addClass('has-error');
            } else {
                //alert('Hello');
                $scope.hasError = true;
                $scope.errors = [];
                $scope.errors.push('Sorry your message could not be sent, please try again');
            }

        }, function (err) {
            console.log(err);
        });
    };

    //WATCH list
    //$scope.$watch(function () {
    //$('.selectcategory').selectpicker('refresh');
    //$('.selectsubcategory').selectpicker('refresh');
    //});
});
