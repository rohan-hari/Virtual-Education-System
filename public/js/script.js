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

// Multi Select Dropdown

var checkList = document.getElementById('category');
var items = document.getElementById('items');
checkList.getElementsByTagName('span')[0].onclick = function(evt) {
  if (items.classList.contains('visible')) {
    items.classList.remove('visible');
    items.style.display = "none";
  } else {
    items.classList.add('visible');
    items.style.display = "block";
  }

}

items.onblur = function(evt) {
  items.classList.remove('visible');
}
