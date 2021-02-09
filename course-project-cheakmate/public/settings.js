/*@Author: Kat*/
var click = 0;
var prevButn = "";

function visibility(id){
  if(click == 0){
    document.getElementById(id).style.display = "block";
    click = 1;
    prevButn = id;
  }
  else if (click == 1 && id == prevButn) {
    document.getElementById(id).style.display = "none";
    click = 0;
    prevButn = "";
  }
  else if (click == 1 && id != prevButn) {
    document.getElementById(prevButn).style.display = "none";
    document.getElementById(id).style.display = "block";
    prevButn = id;
  }
  else {
    alert("This button is not working.");
  }
}

function toCenter(){
  document.getElementById('board').style.float = "none";
  /* setCookie('board', 'center');*/
}

function toLeft(){
  document.getElementById('board').style.float = "left";
  /* setCookie('board', 'left');*/
}

function toRight(){
  document.getElementById('board').style.float = "right";
  /* setCookie('board', 'right');*/
}

function toChessBg(){
  document.body.style.backgroundImage = "url('images/Default.jpg')";
  /* setCookie('bg', 'chess'); */
}

function toLakeBg(){
  document.body.style.backgroundImage = "url('images/Lake.jpg')";
  /* setCookie('bg', 'lake'); */
}

function toGalaxyBg(){
  document.body.style.backgroundImage = "url('images/Galaxy.jpg')";
  /* setCookie('bg', 'galaxy'); */
}
