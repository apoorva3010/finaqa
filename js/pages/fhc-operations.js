/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.controller('fhcController', function ($scope, $http, FrameworkConstants) {
    'use strict';
    $scope.selectedLiabilityType = -1;
    $scope.liabilityList = [];
    $scope.showMainLoader = false;
    $scope.isVisibleInfo = false;
    $scope.showInfo = function () {
        //If DIV is visible it will be hidden and vice versa.
        $scope.isVisibleInfo = $scope.isVisibleInfo ? false : true;
    }
    

    //On load check queryid and get details
    //After loading all, go for the query
    angular.element(function () {
        //If there is no query id then do not call the service
        if ($scope.queryId != null && $scope.queryId > 0) {
            $http.get(FrameworkConstants.baseUrl + "/fhc/getQueryDetails/" + $scope.queryId)
                    .then(function (response) {

                        if (response.data.errorCode == 0) {
                            var actualResponse = JSON.parse(response.data.data);
                            $scope.cashAssets = actualResponse.cashAssets;
                            $scope.equity = actualResponse.equity;
                            $scope.debt = actualResponse.debt;
                            $scope.preciousMetals = actualResponse.preciousMetals;
                            $scope.realEstate = actualResponse.realEstate;
                            if (actualResponse.liabilityList != '') {
                                $scope.liabilityList = actualResponse.liabilityList;
                            }
                        } else {
                            alert(response.data.message);
                        }
                    }, function (err) {
                        console.error(err);
                    });
        }
    });
    //}

    $scope.saveAssetData = function () {
        
        $scope.showMainLoader = true;
        var assetList = [];
        $scope.errors = [];
        if ($scope.cashAssets > 0) {
            
            assetList.push({typeId: 1, amt: $scope.cashAssets});
        }
        if ($scope.equity > 0) {
            assetList.push({typeId: 2, amt: $scope.equity});
        }
        if ($scope.debt > 0) {
            assetList.push({typeId: 3, amt: $scope.debt});
        }
        if ($scope.realEstate > 0) {
            assetList.push({typeId: 4, amt: $scope.realEstate});
        }
        if ($scope.preciousMetals > 0) {
            assetList.push({typeId: 5, amt: $scope.preciousMetals});
        }
        if($scope.cashAssets > 999999999 || $scope.equity > 999999999 || $scope.debt > 999999999 || $scope.realEstate > 999999999 || $scope.preciousMetals > 999999999){
                $scope.errors.push('Please enter value less than 999999999');
                $scope.showMainLoader = false;
                return;
            }
        var request = {
            custId: $scope.custId,
            queryId: $scope.queryId,
            assetList: angular.toJson(assetList)
        };
        $http({
            url: FrameworkConstants.baseUrl + "/fhc/addUpdateAssetList",
            method: "POST",
            data: angular.toJson(request),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            //alert(JSON.stringify(response.data.data));

            if (response.data.errorCode === 0) {
                //location.href = FrameworkConstants.baseUrl + '/(FrameworkConstantsconsultant/dashboard';
                var data = JSON.parse(response.data.data);
                $scope.queryId = data.queryId;
                fhcShowPopup();
            } else {
                //alert('Hello');
                $scope.hasError = true;
                
                $scope.errors.push('Sorry could not save data');
            } //endif else
            $scope.showMainLoader = false;
        }, function (err) {
            console.log(err);
            
            $scope.hasError = true;
            $scope.errors.push('Sorry some error occurred');
            $scope.showMainLoader = false;
        });
    };

    $scope.setLiabilityType = function (liabilityTypeId) {
        $scope.selectedLiabilityType = liabilityTypeId;
        $scope.loanTypeDesc = $scope.getLoanDesc(liabilityTypeId);
    };

    $scope.addNewLiability = function () {
        $scope.showLoader = true;
        var request = {
            custId: $scope.custId,
            queryId: $scope.queryId,
            tenure: $scope.newTenure,
            emiAmt: $scope.newEmi,
            percentageCharge: $scope.newRoi,
            loanType: $scope.selectedLiabilityType,
            loanAmt: $scope.newAmt,
            loanTypeDesc: $scope.loanTypeDesc
        };

        $http({
            url: FrameworkConstants.baseUrl + "/fhc/addLiability",
            method: "POST",
            data: angular.toJson(request),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            //alert(JSON.stringify(response.data.data));

            if (response.data.errorCode === 0) {
                //location.href = FrameworkConstants.baseUrl + '/(FrameworkConstantsconsultant/dashboard';
                var data = JSON.parse(response.data.data);
                $scope.queryId = data.queryId;
                request.liabilityId = data.liabilityId;
                if ($scope.liabilityList == null) {
                    $scope.liabilityList = [];
                }
                $scope.liabilityList.push(request);
                $scope.resetLiabilityDialog();
            } else {
                //alert('Hello');
                $scope.hasError = true;
                $scope.errors = [];
                $scope.errors.push('Sorry some error occurred');
            } //endif else
            $scope.showLoader = false;
            //$('.close').click();
        }, function (err) {
            console.log(err);
            $scope.showLoader = false;
            $scope.hasError = true;
            $scope.errors = [];
            $scope.errors.push('Sorry some error occurred');
        });


    };

    $scope.deleteLiability = function (liabilityId) {
        if (!confirm('Are you sure you want to delete')) {
            return;
        }
        $http.get(FrameworkConstants.baseUrl + "/fhc/deleteLiability/" + liabilityId)
                .then(function (response) {

                    for (var iL = 0; iL < $scope.liabilityList.length; iL++) {
                        if ($scope.liabilityList[iL].liabilityId == liabilityId) {
                            $scope.liabilityList.splice(iL, 1);
                        }
                    }
                    //$scope.categoryList = JSON.parse(response.data.data);
                    //$scope.showLoader = false;
                }, function (err) {
                    console.log(err);
                });
    };

    $scope.resetLiabilityDialog = function () {
        $scope.newAmt = 100000;
        $scope.newRoi = 5;
        $scope.newTenure = 1;
        $scope.newEmi = 5;
    };

    $scope.getLoanDesc = function (liabilityTypeId) {
        var loanDesc = '';
        switch (liabilityTypeId) {
            case 1:
                loanDesc = 'Home Loan';
                break;
            case 2:
                loanDesc = 'Car Loan';
                break;
            case 3:
                loanDesc = 'Personal Loan';
                break;
            case 4:
                loanDesc = 'Education Loan';
                break;
            case 5:
                loanDesc = 'Credit card Loan';
                break;
            default:
                loanDesc = 'No Type';
                break;
        }
        return loanDesc;
    };

    $scope.payConfirm = function () {        
        if($scope.queryId == ""){
            alert('Please provide loans and liabilities details');
            return;
        }
        if($scope.cashAssets > 999999999 || $scope.equity > 999999999 || $scope.debt > 999999999 || $scope.realEstate > 999999999 || $scope.preciousMetals > 999999999){
            alert('Amount should not be greater than 999999999');
            return;
        }
        $scope.showMainLoader = true;
        $scope.saveAssetData();
        
        $http({
            url: FrameworkConstants.baseUrl + '/fhc/payAndConfirm/' + $scope.queryId,
            method: 'POST',
            headers: {'Content-Type': undefined}
        }).then(function (response) {
            if (response.data.errorCode != 0) {
                $scope.hasError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);
                $scope.showMainLoader = false;
            } else {
                $scope.showMainLoader = false;
                $scope.submissionResponse = JSON.parse(response.data.data);
                //alert(response.data.data);
                if ($scope.submissionResponse.amount > 0) {
                    $scope.confirmationText = 'You may have to pay ' + $scope.submissionResponse.amount + ', Click Yes to Proceed, and No to cancel';
//                    $("#popup_box").toggle();
                    showpopup();
                } else {
                    window.location.href = FrameworkConstants.baseUrl + '/customer/questionList';
                }
            }
            //$scope.showMainLoader = false;
        });
    };

    $scope.confirmYes = function () {
        window.location.href = FrameworkConstants.baseUrl + '/pg/requestPayment';
    };

    $scope.confirmNo = function () {
        window.location.href = FrameworkConstants.baseUrl + '/customer/questionList';
    };

});