// Random Colored Box -------------------------------------------------
$(document).ready(function(){
    let colors = ["pink", "green", "blue", "orange", "purple"];
    $(".flex-box-coloured").each(function(){
        if(colors.length == 0){
            colors.push("pink", "green", "blue", "orange", "purple")
        }
        $(this).addClass(colors.splice( ~~(Math.random() * colors.length), 1 )[0] );
   });
});

// Create Modal----------------------------------------------------------

function createAssignment(){
    document.getElementById('create-assignment-model').style.display = "table-row";
}
function addNotification(){
    document.getElementById('add-notification-model').style.display = "block";
}
