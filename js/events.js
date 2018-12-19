//Ensures correct loading and processing of javascript functionality.
"use strict";

//Onready
$(function(){
  //Load Navigation bar
  $("#navigation-bar").load("../data/navigation.html");
  loadNotification("This notification pane is under development.","info");
  $("#footer-content").load("../data/footer.html");

  addModal();
});


function loadNotification(text, ind, html){
  if(html){
      $("#notification-body").html(html);
  }else{
    switch(ind){
      case "info":
          $("#notification-body").html("<div class=\"alert alert-info\"><strong>Info!</strong> " + text + "</div>");
          break;
      case "success":
          $("#notification-body").html("<div class=\"alert alert-success\"><strong>Success!</strong> " + text + "</div>");
          break;
      case "warning":
          $("#notification-body").html("<div class=\"alert alert-warning\"><strong>Warning!</strong> " + text + "</div>");
          break;
      case "danger":
          $("#notification-body").html("<div class=\"alert alert-danger\"><strong>Error!</strong> " + text + "</div>");
          break;
      default:
            $("#notification-body").html("<div class=\"alert alert-info col-sm-12\"><strong>Info!</strong> " + text + "</div>");
            break;
    }
  }
}

function successDialog(){
    addModal("Success!", "Operation completed Successfully");
}

function addModal(title, text, btnArray, footer){

  var itm = $("<!-- Modal --><div class=\"modal fade\" id=\"popUpWindow\" role=\"dialog\"><div class=\"modal-dialog\"><!-- Modal content--><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button><h4 class=\"modal-title\">" + (title !== null && title !== undefined? title:"Operation") + "</h4></div><div class=\"modal-body\"><p>" + (text !== null && text !== undefined? text:"No Message Text Available.") + "</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button></div></div></div></div>");

  $('#container').append(itm);
}

function triggerModal(){
    $('#popUpWindow').modal('show');
    //$('#myModel').modal('toggle');
}
