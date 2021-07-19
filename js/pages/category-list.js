/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('categoryListController', function ($scope, $http, FrameworkConstants) {
    'use strict';
    $scope.selectCatg = true;
    $scope.textCatg = false;
    $scope.selectSubCatg = true;
    $scope.textSubCatg = false;
    $scope.showSaveBtn = false;
    $scope.showSubSaveBtn = false;
    $scope.currentlyProcessing = false;
    $scope.hasModalError = false;
    $scope.hasModalSuccess = false;
    $scope.showSaveBtnOnSelect = true;
    $scope.showSaveBtnOnSubCatg = true;
    $scope.bizOptions = [
        {"id": 0, "bizOption": "No"},
        {"id": 1, "bizOption": "Yes"}
    ];
    $scope.openPopup = function () {
        showAddCatgPopup();
    };
    $scope.cancelClicked = function () {
        hideAddCatgPopup();
    };
    $scope.openSubCatgPopup = function () {
        showAddSubCatgPopup();
    };
    $scope.cancelSubClicked = function () {
        hideAddSubCatgPopup();
    };
    $scope.selectChange = function () {
        if ($scope.selectedCategory != null) {
            $scope.showSaveBtnOnSelect = false;
        }
    }
    $scope.selectSubCategory = function () {
        if ($scope.selectedSubCategory != null) {
            $scope.showSaveBtnOnSubCatg = false;
        }
    }
    $scope.editCatg = function () {
        //alert($scope.selectedCategory.categoryId);
        //alert($scope.selectedCategory.isBiz);
        $scope.showSaveBtn = true;
        $scope.selectCatg = false;
        $scope.textCatg = true;
        $scope.categoryName = $scope.selectedCategory.category;
        $scope.changeBizCategory();
    };
    $scope.editSubCatg = function () {
        $scope.showSubSaveBtn = true;
        $scope.selectSubCatg = false;
        $scope.textSubCatg = true;
        $scope.subCategoryName = $scope.selectedSubCategory.subCategory;
    };
    $scope.discardCatg = function () {
        $scope.selectCatg = true;
        $scope.textCatg = false;
        $scope.showSaveBtn = false;
    };
    $scope.discardSubCatg = function () {
        $scope.selectSubCatg = true;
        $scope.textSubCatg = false;
        $scope.showSubSaveBtn = false;
    };
    $scope.getCategories = function () {
        //Call at the initial level, to get all categories from DB
        $http.get(FrameworkConstants.baseUrl + "/skillCategoryMaster/categories")
                .then(function (response) {
                    $scope.categoryList = JSON.parse(response.data.data);
                    $scope.showLoader = false;
                    $scope.showSaveBtnOnSelect = true;
                }, function (err) {
                    console.log(err);
                });

    };
    $scope.getCategories();

    $scope.changeCategory = function () {
        $scope.showLoader = true;

        $http.get(FrameworkConstants.baseUrl + "/skillSubcategoryMaster/subCategories", {
            params: {
                categoryId: $scope.selectedCategoryOnSubCatg.categoryId
            },
            headers: {
                'Accept': 'application/json'
            }
        }).then(function (response) {
            //            $scope.selectedSubcategory = true;
            $scope.subCategoryList = JSON.parse(response.data.data);
            $scope.showLoader = false;

        }, function (err) {
            console.log(err);
        });
        $scope.showSaveBtnOnSubCatg = true;
        
    };

    $scope.changeBizCategory = function () {        
        angular.forEach($scope.bizOptions, function (value, key) {            
            if (key == $scope.selectedCategory.isBiz) {
                $scope.selectedBizCategory = $scope.bizOptions[key];
            }
        });
    };
    //Add new category
    $scope.addNewCategory = function (isValid) {
        if (!isValid) {
            return;
        }
        var data = {
            //catId: $scope.selectedCategoryId,
            updatedName: $scope.newCategoryName,
            isBiz: $scope.newBizCategory
        };
        $scope.currentlyProcessing = true;
        var request = {
            data: angular.toJson(data)
        };

        $http({
            url: FrameworkConstants.baseUrl + '/skillCategoryMaster/addNewCategory',
            method: 'POST',
            data: angular.toJson(request)
        }).then(function (response) {
            if (response.data.data == 0) {
                $scope.currentlyProcessing = false;
                $scope.successMsg = response.data.message;
                $scope.hasModalSuccess = true;
                $scope.getCategories();
                $scope.newCategoryName = '';
            } else {
                $scope.hasModalError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);

            }
            $scope.currentlyProcessing = false;
            hideAddCatgPopup();
            //hideTextPopup();
        }, function (err) {
            console.log(err);
            $scope.currentlyProcessing = true;

        });
    };

    //Update existing category
    $scope.updateCategory = function (isValid) {
        if (!isValid) {
            return;
        }
        var data = {
            //            catId: $scope.selectedCategoryId,
            catId: $scope.selectedCategory.categoryId,
            updatedName: $scope.categoryName,
            isBiz: $scope.selectedBizCategory.id
        };

        var request = {
            data: angular.toJson(data)
        };

        $http({
            url: FrameworkConstants.baseUrl + '/skillCategoryMaster/updateCategoryName',
            method: 'POST',
            data: angular.toJson(request)
        }).then(function (response) {
            if (response.data.data == 0) {
                $scope.successMsg = response.data.message;
                $scope.hasModalSuccess = true;
                $scope.getCategories();
                $scope.discardCatg();
            } else {
                $scope.hasModalError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);
            }
            $scope.currentlyProcessing = false;
            //hideTextPopup();
        }, function (err) {
            console.log(err);
            $scope.currentlyProcessing = false;
        });

    };

    //Add new subcategory
    $scope.addNewSubCategory = function (isValid) {
        if (!isValid) {
            return;
        }
        var data = {
            catId: $scope.selectedCategoryOnSubCatg.categoryId,
            updatedName: $scope.newSubCategoryName
        };
        $scope.currentlyProcessing = true;
        var request = {
            data: angular.toJson(data)
        };

        $http({
            url: FrameworkConstants.baseUrl + '/skillSubcategoryMaster/addNewCategory',
            method: 'POST',
            data: angular.toJson(request)
        }).then(function (response) {
            if (response.data.data == 0) {
                $scope.currentlyProcessing = false;
                $scope.successMsg = response.data.message;
                $scope.hasModalSuccess = true;
                $scope.changeCategory();
                hideAddSubCatgPopup();
                $scope.newSubCategoryName = '';
            } else {
                $scope.hasModalError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);
            }
            $scope.currentlyProcessing = false;

            //hideTextPopup();
        }, function (err) {
            console.log(err);
            $scope.currentlyProcessing = true;
        });
    };

    //Update existing subcategory
    $scope.updateSubCategory = function (isValid) {
        if (!isValid) {
            return;
        }
        var data = {
            catId: $scope.selectedSubCategory.subCategoryId,
            updatedName: $scope.subCategoryName
        };

        var request = {
            data: angular.toJson(data)
        };

        $http({
            url: FrameworkConstants.baseUrl + '/skillSubcategoryMaster/updateCategoryName',
            method: 'POST',
            data: angular.toJson(request)
        }).then(function (response) {
            if (response.data.data == 0) {
                $scope.successMsg = response.data.message;
                $scope.hasModalSuccess = true;
                //  $scope.getCategories();
                $scope.changeCategory();
                $scope.discardSubCatg();
            } else {
                $scope.hasModalError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);
            }
            $scope.currentlyProcessing = false;
            //hideTextPopup();
        }, function (err) {
            console.log(err);
            $scope.currentlyProcessing = false;
        });
    };
    $scope.$watch(function () {
        $('.selectcategory').selectpicker('refresh');
        $('.selectsubcategory').selectpicker('refresh');
        //$('.selectsubcategory').selectpicker('refresh');
    });

});
