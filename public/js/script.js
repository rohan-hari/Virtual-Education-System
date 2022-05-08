/* Random Colored Box */

$(document).ready(function(){
    let colors = ["pink", "green", "blue", "orange", "purple"];
    $(".flex-box-coloured").each(function(){
        if(colors.length == 0){
            colors.push("pink", "green", "blue", "orange", "purple")
        }
        $(this).addClass(colors.splice( ~~(Math.random() * colors.length), 1 )[0] );
   });
});

/* Assignment Modal */

function createAssignment(){
    document.getElementById('create-assignment-model').style.display = "table-row";
}

/* Notification Modal */

function addNotification() {
    document.getElementById('add-notification-model').style.display = "block";
}
function notificationPanel() {
  var panel = document.getElementById('notification-panel')
  if (panel.classList.contains('visible')) {
    panel.classList.remove('visible');
    panel.style.display = "none";
  } else {
    panel.classList.add('visible');
    panel.style.display = "block";
  }
}

/* Course Modal */

function addCourse() {
  document.getElementById('add-course-model').style.display = "block";
  document.getElementById('add-course-btn').style.display = "none";
}


// Class Model

function addClass() {
  document.getElementById('create-class-model').style.display = "block";
}

//Numbers Only

function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }
  return true;
}