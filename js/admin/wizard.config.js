$(document).ready(function () {
    var data = [];
    // initialize wizard
    $('#wizard').wizard({
        title: 'Submited',
        validators: [{
                step: 1,
                validate: function () {
                    if (!$("input[name='ques-1']:checked").val() && !$("input[name='ques-2']:checked").val() && !$("input[name='ques-3']:checked").val()) {
                        $('#wizard').wizard('error', 'Select any answer');
                        return false;
                    } else {
                        data.push($("input[name='ques-1']:checked").val());
                    }
                }
            },
            {
                step: 2,
                validate: function () {
                    if (!$("input[name='ques-2']:checked").val()) {
                        $('#wizard').wizard('error', 'Select any answer');
                        return false;
                    }
                    else {
                        data.push($("input[name='ques-2']:checked").val());
                    }
                }
            },
            {
                step: 3,
                validate: function () {
                    if (!$("input[name='ques-3']:checked").val()) {
                        $('#wizard').wizard('error', 'Select any answer');
                        return false;
                    }
                    else{
                        data.push($("input[name='ques-3']:checked").val());
                    }
                }
            },
            {
                step: 4,
                validate: function () {
                    if (!$("input[name='ques-4']:checked").val()) {
                        $('#wizard').wizard('error', 'Select any answer');
                        return false;
                    }else{
                        data.push($("input[name='ques-4']:checked").val());
                    }
                }
            },
            {
                step: 5,
                validate: function () {
                    if (!$("input[name='ques-5']:checked").val()) {
                        $('#wizard').wizard('error', 'Select any answer');
                        return false;
                    }else{
                        data.push($("input[name='ques-5']:checked").val());
                    }
                }
            },
            {
                step: 6,
                validate: function () {
                    if (!$("input[name='ques-6']:checked").val()) {
                        $('#wizard').wizard('error', 'Select any answer');
                        return false;
                    }else{
                        data.push($("input[name='ques-6']:checked").val());
                    }
                }
            },
            {
                step: 7,
                validate: function () {
                    if (!$("input[name='ques-7']:checked").val()) {
                        $('#wizard').wizard('error', 'Select any answer');
                        return false;
                    }else{
                        data.push($("input[name='ques-7']:checked").val());
                    }
                }
            }],
        onSubmit: function () {
            $('.wizard-error').css('display', 'none');
            $('#wizard').wizard('end', {
                success: 'Thank you! Given Risk Profile Questionnaire ',
                autoClose: 4000 // close after 4 seconds

            });
            //var event1 = jQuery.Event("submitRiskQuestions");
            //event1.user = "foo";
            //event1.pass = "bar";
            //alert('Hi I am Here');
            $("#hdnData").val(JSON.stringify(data));
            $("#btnTemp").trigger("click", []);

            //$("body").trigger(event);
            //$scope.$emit('submitRiskQuestions', []);
            //$.trigger('submitRiskQuestions');
        },
        onReset: function () {
            //  $('<div>onReset called</div>').appendTo('#EventLog');
        },
        onCancel: function () {
            //  $('<div>onCancel called</div>').appendTo('#EventLog');
        },
        onClose: function () {
            //   $('<div>onClose called</div>').appendTo('#EventLog');
        },
        onOpen: function () {
            //  $('<div>onOpen called</div>').appendTo('#EventLog');
        },
        previousText: 'Previous',
        nextText: 'Next',
        submitText: 'Submit',
        showCancel: false,
        showPrevious: false,
        showProgress: true,
        isModal: true,
        autoOpen: false
    });

    // open wizard
//     $('.sub-cat-select').change(function(){
//         if($('.sub-cat-select option:selected').text() == 'Investment Planning') {
//            $('#wizard').wizard('open');
//         }
//     });
//     COMMENTED
    //$('#btnOpen').click(function() {
//         alert('click');
    //    $('#wizard').wizard('open');
    //});
});
