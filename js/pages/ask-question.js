/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

app.controller(
        "askQuestionController",
        function ($scope, $http, FrameworkConstants) {
            "use strict";
            $scope.selectedCategory = 0;
            $scope.questionList = [];
            $scope.chosenSubcategory = null;
            $scope.subcategoryList = [];
            $scope.categoryList = [];
            $scope.selectedSubcategory = false;
            $scope.showLoader = true;
            $scope.showMainLoader = false;
            $scope.selectedQualification = 0;
            $scope.expectedOutcome = "";
            $scope.durationList = [];
            $scope.selectedDuration = 0;
            $scope.timeRecords = [];
            $scope.questionType = 0;
            //Call at the initial level to get all meeting duration list
            $http
                    .get(
                            FrameworkConstants.baseUrl + "/queryHeader/apiGetMeetingDurationList"
                            )
                    .then(
                            function (response) {
                                $scope.durationList = JSON.parse(response.data.data);
                            },
                            function (err) {
                                console.log(err);
                            }
                    );

            //Call at the initial level, to get all degree list from DB
            $http
                    .get(FrameworkConstants.baseUrl + "/queryHeader/apiGetQualification")
                    .then(
                            function (response) {
                                $scope.qualificationList = JSON.parse(response.data.data);
                            },
                            function (err) {
                                console.log(err);
                            }
                    );

            //Call at the initial level, to get all categories from DB
            $http
                    .get(FrameworkConstants.baseUrl + "/skillCategoryMaster/categories")
                    .then(
                            function (response) {
                                $scope.categoryList = JSON.parse(response.data.data);
                                $scope.showLoader = false;
                            },
                            function (err) {
                                console.log(err);
                            }
                    );

            $scope.changeCategory = function () {
                $scope.showLoader = true;
                $http
                        .get(
                                FrameworkConstants.baseUrl + "/skillSubcategoryMaster/subCategories",
                                {
                                    params: {
                                        categoryId: $scope.selectedCategory,
                                    },
                                    headers: {
                                        Accept: "application/json",
                                    },
                                }
                        )
                        .then(
                                function (response) {
                                    $scope.selectedSubcategory = true;
                                    $scope.subcategoryList = JSON.parse(response.data.data);
                                    $scope.showLoader = false;
                                    $scope.chosenSubcategory = {subCatId: $scope.subcategoryList[0]};
                                },
                                function (err) {
                                    console.log(err);
                                }
                        );
            };

            $scope.submitForm = function ($event, isValid) {
                $scope.showMainLoader = true;
                $event.preventDefault();
                //blockUI.start();

                if ($scope.chosenSubcategory == null) {
                    document.getElementById("cat-errormsg").innerHTML =
                            "Please select at least one category";

                    // alert("Please select at least one category");
                    $scope.showMainLoader = false;
                    return;
                }

                if (typeof $scope.chosenSubcategory.subCatId !== "number") {
                    document.getElementById("subcat-errormsg").innerHTML =
                            "Please select at least one sub category";
                    $scope.showMainLoader = false;
                    return;
                }

                //validations for meeting type of question
                if ($scope.questionType == 2) {
                    if ($scope.timeRecords.length < 3) {
                        document.getElementById("date-errormsg").innerHTML =
                                "Kindly share at least 3 meeting appointment slots";
                        // alert("Kindly share at least 3 meeting appointment slots");
                        $scope.showMainLoader = false;
                        return;
                    } else if ($scope.selectedDuration == 0) {
                        document.getElementById("duration-errormsg").innerHTML =
                                "Kindly select duration for the meeting";
                        $scope.showMainLoader = false;
                        return;
                    } else {
                        // alert("hi");
                        for (var iLoop = 0; iLoop < $scope.timeRecords.length; iLoop++) {
                            var timeRecord = $scope.timeRecords[iLoop];
                            if (timeRecord.appDate == "" || timeRecord.appTime == "") {
                                alert("Kindly check date and time for appointment");
                                $scope.showMainLoader = false;
                                return;
                            }
                        }
                    }
                }
                //alert($scope.chosenSubcategory.subCatId);
                //alert("Status of answered " + $scope.riskQuestionData.riskQuestionStatus);
                //If the category is personal tax then ask risk
                if ($scope.chosenSubcategory.subCatId === 2) {
                    //alert('hello');
                    $http
                            .get(
                                    FrameworkConstants.baseUrl +
                                    "/riskCustAnswer/isRiskQuestionAnswered"
                                    )
                            .then(
                                    function (response) {
                                        //alert(response.data.errorCode);
                                        if (response.data.errorCode == 0) {
                                            $scope.riskQuestionData = JSON.parse(response.data.data);
                                            if ($scope.riskQuestionData.riskQuestionStatus) {
                                                $scope.showMainLoader = false;
                                                $("#wizard").wizard("open");
                                            }
                                        } else {
                                            $scope.submitQuestion();
                                        }
                                    },
                                    function (err) {
                                        console.log(err);
                                    }
                            );
                    //return false;
                }
                //ELSE
                else {
                    $scope.submitQuestion();
                    //blockUI.stop();
                }
            };

            $scope.submitQuestion = function () {
                var formData = new FormData();
                formData.append("title", $scope.questionTitle);
                formData.append("queryType", $scope.questionType);
                formData.append("queryDesc", $scope.questionDesc);
                formData.append("categoryId", $scope.selectedCategory);
                formData.append("subCategoryId", $scope.chosenSubcategory.subCatId);
                formData.append("expectedResolution", $scope.expectedOutcome);
                formData.append("degreeId", $scope.selectedQualification);

                var files = $("#docs").prop("files");
                if (files != null) {
                    for (
                            var iFileCounter = 0;
                            iFileCounter < files.length;
                            iFileCounter++
                            ) {
                        formData.append("file" + iFileCounter, files[iFileCounter]);
                    }
                }

                //if type is meeting then
                if ($scope.questionType == 2) {
                    var meetingLine = "";
                    var meetingTimes = [];
                    for (var iLoop = 0; iLoop < $scope.timeRecords.length; iLoop++) {
                        var timeRecord = $scope.timeRecords[iLoop];
                        meetingTimes.push(timeRecord.appDate + "|" + timeRecord.appTime);
                    }
                    meetingLine = meetingTimes.join(",");
                    formData.append("meetingLine", meetingLine);
                    formData.append("duration", $scope.selectedDuration);
                }

                $http({
                    url: FrameworkConstants.baseUrl + "/queryHeader/submitQuestion",
                    method: "POST",
                    data: formData,
                    headers: {"Content-Type": undefined},
                }).then(function (response) {
                    if (response.data.errorCode != 0) {
                        $scope.hasError = true;
                        $scope.errors = [];
                        $scope.errors.push(response.data.message);
                    } else {
                        $scope.submissionResponse = JSON.parse(response.data.data);

                        //alert(response.data.data);
                        if ($scope.submissionResponse.amount > 0) {
                            $scope.confirmationText =
                                    "You may have to pay " +
                                    $scope.submissionResponse.amount +
                                    ", Click Yes to Proceed, and No to cancel";
                            //                    $("#popup_box").toggle();
                            showpopup();
                            /*if (confirm('You may have to pay ' + $scope.submissionResponse.amount + ', Click Yes to Proceed, and No to cancel')) {
                             window.location.href = FrameworkConstants.baseUrl + '/pg/requestPayment';
                             } else {
                             window.location.href = FrameworkConstants.baseUrl + '/customer/questionList';
                             }*/
                        } else {
                            window.location.href =
                                    FrameworkConstants.baseUrl + "/customer/questionList";
                        }
                    }
                    $scope.showMainLoader = false;
                });
            };

            $scope.confirmYes = function () {
                window.location.href = FrameworkConstants.baseUrl + "/pg/requestPayment";
                

                    //payButton.setAttribute('style', 'display: inline;');
                    //payButton.addEventListener('click', function () {
                    //onBuyClicked(request);
                    //request = initGpay();
                    //});
                
            };

            $scope.confirmNo = function () {
                window.location.href =
                        FrameworkConstants.baseUrl + "/customer/questionList";
            };

            $scope.submitRiskQuestions = function ($event, data) {
                $scope.showMainLoader = true;
                var values = JSON.parse($("#hdnData").val());

                var answerList = [];
                angular.forEach(
                        values,
                        function (value, key) {
                            var splitValue = value.split("|");

                            answerList.push({
                                questionId: splitValue[0],
                                answerId: splitValue[1],
                            });
                        },
                        answerList
                        );

                var mainData = {
                    data: JSON.stringify(answerList),
                };

                $http({
                    url: FrameworkConstants.baseUrl + "/riskCustAnswer/answerRiskQuestions",
                    method: "POST",
                    data: mainData,
                    headers: {"Content-Type": "application/json"},
                }).then(function (response) {
                    if (response.data.errorCode == 0) {
                        $scope.submitQuestion();
                    }
                });
                //alert(angular.toJson(log));
            };

            //WATCH list
            $scope.$watch(function () {
                $(".selectcategory").selectpicker("refresh");
                $(".selectsubcategory").selectpicker("refresh");
            });

            $scope.addMoreRows = function () {
                if ($scope.timeRecords.length < 3) {
                    $scope.timeRecords.push({appDate: "", appTime: ""});
                }
            };

            $scope.removeRow = function (index) {
                $scope.timeRecords.splice(index, 1);
            };
        }
);
