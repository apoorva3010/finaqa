$(document).ready(function () {
    'use strict';

    $("#display_popup").click(function () {
        showChargesPopup();
    });
    $(".close_button").click(function () {
        hidepopup();
        hideTextPopup();
        fhcHidePopup();
        hideChargesPopup();
        hideAddCatgPopup();
        hideAddSubCatgPopup();
    });

});

function showTextPopup() {
    $('#popup_text_box').addClass('is-visible');
}

function hideTextPopup() {
    $('#popup_text_box').removeClass('is-visible');
}

function showpopup() {
    $('#popup_box').addClass('is-visible');
}

function hidepopup() {
    $('#popup_box').removeClass('is-visible');
}


function fhcShowPopup() {
    $('#pay_confirm_popup_box').addClass('is-visible');
}

function fhcHidePopup() {
    $('#pay_confirm_popup_box').removeClass('is-visible');
}

function showChargesPopup() {
    $('#popup_charges_box').addClass('is-visible');
}

function hideChargesPopup() {
    $('#popup_charges_box').removeClass('is-visible');
}

function showAddCatgPopup() {
    $('#popup_addCatg_box').addClass('is-visible');
}

function hideAddCatgPopup() {
    $('#popup_addCatg_box').removeClass('is-visible');
}
function showAddSubCatgPopup() {
    $('#popup_addSubCatg_box').addClass('is-visible');
}

function hideAddSubCatgPopup() {
    $('#popup_addSubCatg_box').removeClass('is-visible');
}

function showForgetPasswordPopup() {
    $('#fogotpasswordModal').addClass('is-visible');
}

function hideForgetPasswordPopup() {
    $('#fogotpasswordModal').removeClass('is-visible');
}


