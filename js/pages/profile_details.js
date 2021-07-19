 jQuery(document).ready(function ($) {
    'use strict';
     $.validate();
     $('#user_DOB').datepicker({
         format: "dd-mm-yyyy",
         clearBtn: true,
         autoclose: true,
         pickerPosition: 'top-left',
         showMeridian: false,
         formatViewType: 'time',
     });

 });
