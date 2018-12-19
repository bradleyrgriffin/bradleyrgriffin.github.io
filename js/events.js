//Ensures correct loading and processing of javascript functionality.
"use strict";

//Onready
$(function(){
  //Load Navigation bar
  $("#navigation-bar").load("../data/navigation.html");
  loadNotification("This notification pane is under development.","info");
  $("#footer-content").load("../data/footer.html");

  // Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

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


function loadPopup(data){

}
