/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function validateSubmit() {
  var queryId = $(this).attr("frmId");
  var rdName = "rd-" + queryId;
  var inputChecked = $('input[name="' + rdName + '"]').prop("checked");

  if (!inputChecked) {
    alert("Kindly select at lease one meeting time before proceeding");
  }
  return false;
}
