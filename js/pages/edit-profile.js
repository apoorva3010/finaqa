$(function () {
    'use strict';

    $('.btn-edit-info').on('click', function () {
        $('.profile-account .form-group').each(function () {
            $(this).children('.userinfo').addClass('invisible');
            $(this).children('.field-text').addClass('visible-field');
            $(this).addClass('visible-field');
        });
    });


    $('.cancel-edit-info').on('click', function () {
        $('.profile-account .form-group').each(function () {
            $(this).children('.userinfo').removeClass('invisible');
            $(this).children('.field-text').removeClass('visible-field');
            $(this).removeClass('visible-field');
        });
    });

    $('#user_DOB').datepicker({
        format: "yyyy-mm-dd",
        clearBtn: true,
        autoclose: true,
        pickerPosition: 'top-left',
        showMeridian: false,
        formatViewType: 'time',
    });
});
