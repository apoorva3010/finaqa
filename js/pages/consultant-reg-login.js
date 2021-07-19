/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller('consultantLoginController', function ($scope, $http, FrameworkConstants/*, ngPopover*/) {
    'use strict';
    $scope.hasSuccess = false;
    $scope.selectedSkillCount = 0;
    $scope.qualification = -1;
    $scope.skillList = [];
    $scope.showMainLoader = false;
    var dt = ""
    $scope.con = {
        professionalNo: "",
        rbiNo: "",
        city: "",
        skypeId: "",
        gstNo: "",
        qualification: -1,
        skillList: []
    };

    $scope.submitLoginForm = function (isValid) {
        if (!isValid) {
            //alert('Not valid');
            return;
        }

        var loginObject = {
            conEmailId: $scope.emailId,
            password: $scope.password
        };
        var mainData = {
            data: JSON.stringify(loginObject)
        };
        //alert($location.path());

        $http({
            url: FrameworkConstants.baseUrl + "/consultant/apiWebConsultantLogin",
            method: "POST",
            data: JSON.stringify(mainData),
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            //alert(JSON.stringify(response.data.errorCode));

            if (response.data.errorCode === 0) {
                //location.href = FrameworkConstants.baseUrl + '/(FrameworkConstantsconsultant/dashboard';

                if (!$scope.$$phase)
                {
//                    $location.path('/consultant-dashboard');
                    $scope.$apply();
                } else
                {
                    //alert()
                    window.location.href = FrameworkConstants.baseUrl + '/consultant/dashboard';
                }
            } else {
                //alert('Hello');
                $scope.hasError = true;
                $scope.errors = [];
                $scope.errors.push('Could not authenticate the consultant');
            }

        }, function (err) {
            console.log(err);
            $scope.errors = [];
            $scope.hasError = true;
            $scope.errors.push('Sorry unknown error occurred');
        });

    };

    $scope.changeSkills = function () {
        $scope.selectedSkillCount = $scope.con.skillList.length;
        //alert(angular.toJson($scope.skillList));  
    };

    $scope.saveConsultant = function () {

        $scope.errors = [];
        var files = $('#docs').prop('files');
        var profilePicFiles = $('#profileImg').prop('files');

        $scope.validateConsultantData(files, true);

        if ($scope.errors.length > 0) {
            $scope.hasError = true;
            //alert($scope.errors);
            return;
        }
        $scope.showMainLoader = true;
        var formData = $scope.createRegistrationFormData(files);
        formData.append("conId", $scope.con.consultantId);
        formData.append("bankName", $scope.con.bankName);
        formData.append("bankAcNo", $scope.con.bankAcNo);
        formData.append("ifscCode", $scope.con.bankIfscCode);
        formData.append("bankBranch", $scope.con.bankBranch);
        formData.append("gstNo", $scope.con.gstNo);
        if (profilePicFiles != null) {
            if (profilePicFiles.length > 0) {
                formData.append("profilePic", profilePicFiles[0]);
            }
        }

        $("#btnSubmitReg").val('Processing...');
        $("#btnSubmitReg").disabled = true;

        $http({
            url: FrameworkConstants.baseUrl + '/consultant/saveConsultant',
            method: 'POST',
            data: formData,
            headers: {'Content-Type': undefined}
        }).then(function (response) {
            if (response.data.errorCode != 0) {
                $scope.hasError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);
            } else {
                $scope.hasSuccess = true;
                $scope.successMsg = response.data.message;
                //$scope.submissionResponse = JSON.parse(response.data.data);
                //window.location.href = FrameworkConstants.baseUrl + '/consultant/login';
            }
            $scope.showMainLoader = false;
        }, function (err) {
            console.log(err);
            $scope.hasError = true;
            $scope.showMainLoader = false;
            $scope.errors.push('Sorry unknown error occurred');
        });
    };

    $scope.submitRegistration = function (isValid, frmErrors) {
        $scope.hasError = false;
        $scope.errors = [];
        //alert(isValid);
        //alert(frmErrors.length);

        if (!isValid) {
            angular.forEach(frmErrors, function (errors, key) {
                angular.forEach(errors, function (value, keyOne) {
                    if (value.$error != null) {
                        if (value.$error.maxlength) {
                            $scope.errors.push(value.$name + ' has exceeed maximum length');
                        }
                        if (value.$error.required) {
                            $scope.errors.push(value.$name + ' is necessary');
                        }
                    }
                    //alert(key + ' ' + angular.toJson(value));
                });
            });
            if ($scope.errors.length > 0) {
                $scope.hasError = true;
                //return;
            }
            //$scope.hasError = true;
            //alert($scope.errors.length);
            return;
        }
        $scope.showMainLoader = true;
        //$scope.errors = [];
        var files = $('#docs').prop('files');
        $scope.validateConsultantData(files, false);

        if ($scope.errors.length > 0) {
            $scope.hasError = true;
            $scope.showMainLoader = false;
            //alert($scope.errors);
            return;
        }

        var formData = $scope.createRegistrationFormData(files);

        $("#btnSubmitReg").val('Processing...');
        $("#btnSubmitReg").disabled = true;

        $http({
            url: FrameworkConstants.baseUrl + '/consultant/registerConsultant',
            method: 'POST',
            data: formData,
            headers: {'Content-Type': undefined}
        }).then(function (response) {
            if (response.data.errorCode != 0) {
                $scope.hasError = true;
                $scope.errors = [];
                $scope.errors.push(response.data.message);
            } else {
                $scope.submissionResponse = JSON.parse(response.data.data);
                window.location.href = FrameworkConstants.baseUrl + '/admin/consultant';
            }
            $scope.showMainLoader = false;
        }, function (err) {
            console.log(err);
            $scope.hasError = true;
            $scope.showMainLoader = false;
            $scope.errors.push('Sorry unknown error occurred');
        });
    };

    $scope.validateConsultantData = function (files, update) {
        dt = new moment( );
        var dtEntered = moment($scope.con.dob);
        var years = dt.diff(dtEntered, 'years');
        if (years < 18) {
            $scope.errors.push('Sorry, the minimum age is 18 years');
        }
        if ($scope.con.skillList.length == 0) {
            $scope.errors.push('At least one skills should be selected for the consultant');
        }
        if ($scope.con.qualification == -1) {
            $scope.errors.push('Please specify relevant educational qualification');
        }
        if (!update) {
            if (files.length == 0) {
                $scope.errors.push('Please upload at least one proof');
            }
        }
    };

    $scope.createRegistrationFormData = function (files) {
        var formData = new FormData();
        formData.append("name", $scope.con.conName);
        formData.append("emailId", $scope.con.conEmail);
        formData.append("dob", $scope.con.dob);
        formData.append("gender", $scope.con.gender);
        formData.append("password", $scope.con.password);
        formData.append("phoneNo", $scope.con.conPhone);
        formData.append("practicingYear", $scope.con.practicingYear);
        formData.append("degree", $scope.con.qualification);
        formData.append("empStatus", $scope.con.empStatus);
        formData.append("college", $scope.con.college);
        formData.append("country", $scope.con.country);
        formData.append("city", $scope.con.city);
        formData.append("skypeId", $scope.con.skypeId);
        formData.append("regNo", $scope.con.professionalNo);
        formData.append("rbiNo", $scope.con.rbiNo);
        formData.append("subcategories", $scope.con.skillList);

        for (var iFileCounter = 0; iFileCounter < files.length; iFileCounter++) {
            formData.append("file" + iFileCounter, files[iFileCounter]);
        }

        return formData;
    };

    $scope.getCategories = function (categoryList, catId) {
        //alert(categoryList);
        $http.get(FrameworkConstants.baseUrl + "/skillSubcategoryMaster/getNames", {
            params: {
                categories: categoryList
            }, headers: {
                'Accept': 'application/json'
            }
        }).then(function (response) {
            $scope.categoryNames = JSON.parse(response.data.data);
            //alert($scope.categoryNames);
            //$scope.showLoader = false;
            $("#pop" + catId).html($scope.categoryNames);
            /*ngPopover.open({
             template: 'testTemplate',
             title: 'Skills',
             placement: 'top'
             });*/

        }, function (err) {
            console.log(err);
            $scope.hasError = true;
            $scope.errors.push('Sorry unknown error occurred');
        });
    };

    $scope.activate = function () {
        $scope.showMainLoader = true;
        $scope.errors = [];
        //var consultantId = $scope.consultantId;
        $http.get(FrameworkConstants.baseUrl + "/consultant/activateConsultant/" + $scope.con.consultantId, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(function (response) {
            if (response.data.errorCode == 0) {
                $scope.hasSuccess = true;
                $scope.active = 1;
                $scope.successMsg = response.data.message;
                //alert(response.data.message);
            } else {
                $scope.hasError = true;
                $scope.errors.push(response.data.message);
            }
            $scope.showMainLoader = false;
        }, function (err) {
            console.log(err);
            $scope.showMainLoader = false;
            $scope.hasError = true;
            $scope.errors.push('Sorry unknown error occurred');
        });
    };

    $scope.inactivate = function () {
        $scope.showMainLoader = true;
        $scope.errors = [];
        $http.get(FrameworkConstants.baseUrl + "/consultant/inActivateConsultant/" + $scope.con.consultantId, {
            headers: {
                'Accept': 'application/json'
            }
        }).then(function (response) {
            if (response.data.errorCode == 0) {
                $scope.active = 0;
                $scope.hasSuccess = true;
                $scope.successMsg = response.data.message;
                //alert(response.data.message);
            } else {
                $scope.hasError = true;
                $scope.errors.push(response.data.message);
            }
            $scope.showMainLoader = false;
        }, function (err) {
            console.log(err);
            $scope.showMainLoader = false;
            $scope.hasError = true;
            $scope.errors.push('Sorry unknown error occurred');
        });
    };
});
