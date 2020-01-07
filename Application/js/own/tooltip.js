var divElement;
function showTooltip() {
  var elementList = document.getElementById("tooltips").children;
  for(let divElement of elementList){

    //element found and mouse hovers some object?
    if (selectedRoom != undefined && visableRooms.filter(r => r.name == divElement.id).length > 0) {
      //hide until tooltip is ready (prevents some visual artifacts)
      divElement.style.display = "block";

      //!!! === IMPORTANT ===
      // DIV element is positioned here
      var canvasHalfWidth = renderer.domElement.offsetWidth / 2;
      var canvasHalfHeight = renderer.domElement.offsetHeight / 2;
      calculateLatestMouseIntersection(visableRooms.filter(r => r.name == divElement.id)[0]);
      var tooltipPosition = latestMouseIntersection.clone().project(camera);
      tooltipPosition.x =
        tooltipPosition.x * canvasHalfWidth +
        canvasHalfWidth +
        renderer.domElement.offsetLeft;
      tooltipPosition.y =
        -(tooltipPosition.y * canvasHalfHeight) +
        canvasHalfHeight +
        renderer.domElement.offsetTop;

      var tootipWidth = divElement.offsetWidth;
      var tootipHeight = divElement.offsetHeight;

      divElement.style.left = `${tooltipPosition.x - tootipWidth / 2}px`;
      divElement.style.top = `${tooltipPosition.y - tootipHeight - 5}px`;

      divElement.style.opacity = 1.00;
    } else {
      divElement.style.display = "none";
    }
  }
}

function updateTooltip(RoomName, name, department, pictureNeeded, twoPictures) {
    document.getElementById('tooltips').innerHTML += "<div id='" + RoomName + "' class='tooltip' style='display:none'></div>";
    divElement = document.getElementById(RoomName);
    if(pictureNeeded){
      divElement.innerHTML = "<div class='row'><div class=''><img id='" + RoomName + 'Image1' + "' height='60' width='60' style='margin-left:8px; margin-right:8px'></img></div>" 
      + "<span style='padding-top:8px; margin-right: 8px;'>Raum: " + RoomName + "<br>"
      + "Austellung: " + name + "</span></div>";
      // divElement.innerHTML +=
      // "<span class='col-9'>Raum: " + RoomName + "</span></div><br>";
    }else {
      divElement.innerHTML =
      "Raum: " + RoomName + "<br>";

      if(name != "-"){
        divElement.innerHTML += "Austellung: " + name;
      } else {
        divElement.innerHTML += "Keine Austellung verfügbar.";
      }
    }

    if(twoPictures){
      divElement.innerHTML = "<div class='row'><div class=''><img id='" + RoomName + 'Image1' + "' height='60' width='60' style='margin-left:8px; margin-right:8px'></img></div>" 
      + "<span style='padding-top:8px;'>Raum: " + RoomName + "<br>"
      + "Austellung: " + name + "</span>" + "<img id='" + RoomName + 'Image2' + "' height='60' width='60' style='margin-left:6px; margin-right:8px'></img></div>";
    }

    /*if(department != "-"){
      divElement.innerHTML += "<br>"
      + department;
    }*/
}

function hideTooltip(){
    TOOLTIP_VISIBLE = false;
    if (selectedRoom != undefined && document.getElementById("tooltips").children.length == 0) {
      selectedRoom.material.color = white;
      selectedRoom = undefined;
    }
}
