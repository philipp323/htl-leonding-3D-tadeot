function filterVisableRooms() {
  var helpChar;
  if (floors[0].toString() == visableFloorName) {
    helpChar = "U";
  }
  if (floors[1].toString() == visableFloorName) {
    helpChar = "E";
  }
  if (floors[2].toString() == visableFloorName) {
    helpChar = "1";
  }
  if (floors[3].toString() == visableFloorName) {
    helpChar = "2";
  }
  visableRooms = objectArr.filter(
    //filter visable(clickable)Rooms, Floors shouldn't be there.
    x =>
      x.name[0] == helpChar &&
      x.name != floors[0] &&
      x.name != floors[1] &&
      x.name != floors[2] &&
      x.name != floors[3]
  );
  if (helpChar == "U") {  //also add the K's just for the naming..
    var kRooms = objectArr.filter(x => x.name[0] == "K");
    kRooms.forEach(r => visableRooms.push(r));
  }
  //"vor" Problem lösen
  if (helpChar == "E"){
    var vorRooms = objectArr.filter(x => x.name.startsWith('v'));
    vorRooms.forEach(r => visableRooms.push(r));
  }
}

function handleEvents() {
  intersectObjects = raycaster.intersectObjects(visableRooms, true);
  intersectedFloors = raycaster.intersectObjects(objects, true);

  if (intersectObjects.length > 0 && MODE == "ROOM") {
    $("#keyboard").hide();
    allRoomsWhite();
    $("#tooltips").html("");
    selectedDepartment = "";
    TOOLTIP_VISIBLE = false;
    hideTooltip();
    $("#teacherImage").remove();

    selectedRoom = intersectObjects[0].object;
    randomColor = new THREE.Color(Math.random() * 0xffffff);
    selectedRoom.material.color = randomColor;

    // console.log(selectedRoom.name);
    // console.log(visableRooms);

    var exhibit = exhibits.find(t => t.room.name == selectedRoom.name);
    if (exhibit != undefined) {
      setExhibitTooltip(selectedRoom.name, exhibit.name, exhibit.department);
    } else {
      updateTooltip(selectedRoom.name, "-", "-", false);
    }
    needsUpdate = true;
    setTimeout(function () {
      TOOLTIP_VISIBLE = true;
      showTooltip();
    }, 50);
  }
  if (intersectedFloors.length > 0 && MODE == "FLOOR") {
    floorName = intersectedFloors[0].object.name;
    if (floors.includes(floorName)) {
      MODE = "ROOM";
      floorSelect(floorName);
    }
    needsUpdate = true;
  }
}

function getAllRooms() {
  allRooms = objectArr.filter(
    x =>
      x.name != floors[0] &&
      x.name != floors[1] &&
      x.name != floors[2] &&
      x.name != floors[3]
  );
}

function chooseRoom(roomName, supervisor, name, department, MULTIPLE_ROOMS) {
  $("#keyboard").hide();
  repositionCamera();
  if (ENABLEDBUTTONS) {
    var selectedRoomArray = allRooms.filter(room => room.name == roomName);
    if(!MULTIPLE_ROOMS){
      selectedDepartment = "";
      $("#tooltips").html("");
      allRoomsWhite();
      hideTooltip();
      $("#teacherImage").remove();
    }
    selectedRoom = selectedRoomArray[0];
    if (selectedRoom != undefined) {
      if(!MULTIPLE_ROOMS){
        path = pathToRoom(selectedRoom.name);
        $("#teacherName").text(name);
        $("#teacherDesc").text(path);
        $("#descCard").show();
        CHOOSING = true;
        chooseFloor(selectedRoom);
      } else {
          $("#descCard").hide();
        }
      setExhibitTooltip(selectedRoom.name, name, department);
      selectedRoom = selectedRoomArray[0];
      //console.log(selectedRoomArray);
      //console.log(selectedRoom);

      randomColor = new THREE.Color(Math.random() * 0xffffff);
      selectedRoom.material.color = randomColor;

      CHOOSING = false;
    }
  }
}

function setExhibitTooltip(roomName, name, department) {
  var imagePath = 'logos/' + department + '.PNG';
  $.get(imagePath)
    .done(function () {
      updateTooltip(roomName, name, department, true);
      $('#' + roomName + 'Image').attr("src", imagePath);
    }).fail(function () {
      updateTooltip(roomName, name, department, false);
    });
}

function pathToRoom(roomName) {

  var path = "";
  var roomNumber = roomName[1];
  roomNumber += roomName[2];

  if (roomName[0] == "K") {
    path += "Gehen Sie nach links bis zum Ende des Ganges.\n Gehen Sie die Treppe hinunter.\n Die Klasse befindet sich links."
    return path;
  }

  else if (roomName[0] == "U") {
    path += "Gehen Sie ein Stockwerk runter. \n";

    if (roomNumber >= 39 && roomNumber <= 92) {
      path += "Gehen Sie anschließend nach links.";
    }
    else {
      path += "Gehen Sie anschließend nach rechts.";
    }
  }

  else if (roomName[0] == "E") {
    path += "Bleiben Sie im selben Stockwerk.\n"

    if (roomNumber >= 05 && roomNumber <= 26 || (roomNumber >= 71 && roomNumber <= 74)) {
      path += "Gehen Sie nach links. \n"
      if (roomNumber >= 05 && roomNumber <= 18) {
        path += "Gehen Sie anschließend nach rechts.";
      }
      else {
        path += "Gehen Sie anschließend nach links.";
      }
    }
    else {
      path += "Gehen Sie nach rechts und anschließend nach links."
    }
  }

  else if (roomName[0] == 1) {
    path += "Gehen Sie ein Stockwerk nach oben. \n";

    if (roomNumber >= 31 && roomNumber <= 48) {
      path += "Gehen Sie nach links. \n";

      if (roomNumber >= 31 && roomNumber <= 38) {
        path += "Gehen Sie anschließend nach rechts.";
      }
      else {
        path += "Gehen Sie anschließend nach links.";
      }

    }

    else {
      path += "Gehen Sie nach rechts. \n";
      if (roomNumber >= 03 && roomNumber <= 15) {
        path += "Gehen Sie anschließend nach rechts.";
      }
      else {
        path += "Gehen Sie anschließend nach links.";
      }
    }
  }

  else if (roomName[0] == 2) {
    path += "Gehen Sie zwei Stockwerke nach oben. \n";
    if (roomNumber >= 26 && roomNumber <= 41) {
      path += "Gehen Sie nach links. \n";
      if (roomNumber >= 26 && roomNumber <= 36) {
        path += "Gehen Sie anschließend nach rechts."
      }
      else {
        path += "Gehen Sie anschließend nach links."
      }
    }
    else {
      path += "Gehen Sie nach rechts. \n";
      if (roomNumber >= 03 && roomNumber <= 08) {
        path += "Gehen Sie anschließend nach rechts."
      }
      else {
        path += "Gehen Sie anschließend nach links."
      }
    }
  }
  return path;
}

async function onDocumentMouseDown(event) {
  //event.preventDefault();
  console.log("Entered Mouse-Down");
  TOOLTIP_VISIBLE = true;
  //console.log(controls);

  mouse3D = new THREE.Vector3(
    ((event.clientX - renderer.domElement.offsetLeft) / window.innerWidth) * 2 - 1,
    -((event.clientY - renderer.domElement.offsetTop) / window.innerHeight) * 2 + 1,
    0.5);
  raycaster.setFromCamera(mouse3D, camera);
  filterVisableRooms();
  intersectObjects = raycaster.intersectObjects(visableRooms, true);
  //console.log(intersectObjects);
  if (intersectObjects.length > 0 && MODE == "ROOM") {
    event.preventDefault();

    handleEvents();
    needsUpdate = true;
  }
}

async function onDocumentMouseUp(event) {
  // console.log("Mouse up");
  TOOLTIP_VISIBLE = false;
}

async function onDocumentTouchEnd(event) {
  // console.log("touch end");
  TOOLTIP_VISIBLE = false;
}

async function onDocumentTouchDown(event) {

  //event.preventDefault();
  TOOLTIP_VISIBLE = true;
  mouse3D = new THREE.Vector3(
    ((event.changedTouches[0].clientX - renderer.domElement.offsetLeft) /
      window.innerWidth) * 2 - 1, -
      ((event.changedTouches[0].clientY - renderer.domElement.offsetTop) /
        window.innerHeight) * 2 + 1, 0.5
  );
  raycaster.setFromCamera(mouse3D, camera);

  filterVisableRooms();

  // console.log("Entered Touch-Down");
  handleEvents();
  needsUpdate = true;
}

async function onControlsChange() {
  TOOLTIP_VISIBLE = true;
}

function departmentSelect(departmentName) {
  allRoomsWhite();
  $("#tooltips").html("");
  exhibitsWithDepartment = exhibits.filter(x => x.department.includes(departmentName));
  console.log(exhibitsWithDepartment);

  selectedDepartment = departmentName;

  exhibitsWithDepartment.forEach(e => chooseRoom(e.room.name, e.supervisor, e.name, e.department, true));

  var roomArrayWithDepartment = [];
  exhibitsWithDepartment.forEach(e => {
    roomArrayWithDepartment.push(allRooms.filter(r => r.name ==  e.room.name)[0]);
  });

  var currentlySelectedFloorOK = true;

  roomArrayWithDepartment.forEach(r => {
    if(r != undefined){
      var floorChar = r.name.charAt(0);
        if (floorChar == "U" || floorChar == "K") {
          if('cellar' == currentlySelectedFloor){
            currentlySelectedFloorOK = true;
          } else{
            currentlySelectedFloorOK = false;
          }
        } else if (floorChar == "E") {
          if('ground_floor' == currentlySelectedFloor){
            currentlySelectedFloorOK = true;
          } else{
            currentlySelectedFloorOK = false;
          }
        } else if (floorChar == "1") {
          if('first_floor' == currentlySelectedFloor){
            currentlySelectedFloorOK = true;
          } else{
            currentlySelectedFloorOK = false;
          }
        } else {
          if('second_floor' == currentlySelectedFloor){   
            currentlySelectedFloorOK = true;     
          } else{
            currentlySelectedFloorOK = false;
          }
        }
    }
  });
  
  if(!currentlySelectedFloorOK){
    chooseFloor(roomArrayWithDepartment[0]);
  }
}

function allRoomsWhite() {
  allRooms.forEach(r => r.material.color = white);
}

function chooseFloor(room){
  var floorChar = room.name.charAt(0);
  MODE = "ROOM";
  if (floorChar == "U" || floorChar == "K") {
    floorSelect('cellar');
    hideStandort();
  } else if (floorChar == "E") {
    floorSelect('ground_floor');
    showStandort();
  } else if (floorChar == "1") {
    floorSelect('first_floor');
    hideStandort();
  } else {
    floorSelect('second_floor');
    hideStandort();
  }
}

function calculateLatestMouseIntersection(room){
  var vector = new THREE.Vector3(
    room.geometry.attributes.position.array[0],
    room.geometry.attributes.position.array[1],
    room.geometry.attributes.position.array[2]
  );
  //console.log(vector);
  latestMouseIntersection = vector;
}