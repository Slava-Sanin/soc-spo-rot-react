import $ from 'jquery';
import {timer, gamecode, loaded, virtual_buttons_moving, p1, p2, p3} from './globals';
import {InitStatus, moveVirtualButtons, PlayMySound, Sound_On_Off} from "./functions";
import {ComputerDlg, PlayerDlg} from "./ClassSpot";
import {Bsp} from "./constants";

export default function main(){

$("#btn-sokoban").click(function(){
  $(this).hide();
  $("#tabs").css("visibility","visible");
  $("#tabs-1").css("visibility","visible");
  $('li[aria-controls="tabs-1"]').css("visibility","visible");
  gamecode = 1;
  p1.change_level();
  p1.init();
  $("#ui-id-1").click();
  $(".status").html('<div id="status_sokoban"> <div className="time"> Time of game: </div><div className="level"> Level: </div><div className="moves"> Moves made: </div></div>');
  loaded++;
  p1.is_loaded = 1;
});

$("#btn-spot").click(function(){
  $(this).hide();
  $("#tabs").css("visibility","visible");
  $("#tabs-2").css("visibility","visible");
  $('li[aria-controls="tabs-2"]').css("visibility","visible");
  gamecode = 2;
  p2.is_loaded = 1;
  p2.init();
  $("#ui-id-2").click();
  loaded++;
});

$("#btn-rotms").click(function(){
  $(this).hide();
  $("#tabs").css("visibility","visible");
  $("#tabs-3").css("visibility","visible");
  $('li[aria-controls="tabs-3"]').css("visibility","visible");
  gamecode = 3;
  p3.change_level();
  p3.init();
  $("#ui-id-3").click();
  $(".status").html('<div id="status_rotms"> <div className="time"> Time of game: </div><div className="level"> Level: </div><div className="moves"> Moves: </div><div className="score"> Score: </div></div>');
  loaded++;
  p3.is_loaded = 1;
});

$("div#tabs-2 div.board div").click(function(){
  if (!p2.is_loaded) return;
  let elem = $(this);
  let x = (elem[0].offsetTop - 80 - (elem[0].offsetTop % 40) ) / 40;
  let y = (elem[0].offsetLeft - 7) / 40;
  //console.log(elem[0].offsetTop,"x=",x);
  //console.log(elem[0].offsetLeft,"y=",y);
  p2.player_move(x, y);
  //p2.pushbutton(x, y);
});

$("div#tabs-2 div.board div").mouseover(function(){
  if (!p2.is_loaded) return;
  let elem = $(this);
  let x = (elem[0].offsetTop - 80 - (elem[0].offsetTop % 40) ) / 40;
  let y = (elem[0].offsetLeft - 7) / 40;
  //console.log(elem[0].offsetTop,"x=",x);
  //console.log(elem[0].offsetLeft,"y=",y);
  if (p2.data_level[x*Bsp+y] === PlayerDlg.color) elem.css("cursor","pointer");
  else elem.css("cursor","unset");
    //p2.player_move(x, y);
    //p2.pushbutton(x, y);
});

$("div#tabs-3 div.board div").click(function(){
  if (!p3.is_loaded) return;
  let elem = $(this);
  let x = (elem[0].offsetTop - 50 - (elem[0].offsetTop % 25) ) / 25;
  let y = (elem[0].offsetLeft - 5) / 25;
  p3.pushbutton(x, y);
});

$("#btn-sound").click(function(){
  Sound_On_Off();
  return false;
});


$(".up").click(function(){
  if (!loaded) return;
  switch (gamecode)
  {
    case 1:
      if (p1.level === 1) break;
      p1.level--;
      $("#tabs-1 .scroll .lev-position").css("height", 15 * p1.level + 4);
      p1.change_level();
      PlayMySound("changepage.wav");
      p1.init();
      InitStatus();
      break;
    case 3:
      if (p3.level === 1) break;
      p3.level--;
      $("#tabs-3 .scroll .lev-position").css("height", 15 * p3.level + 4);
      p3.change_level();
      PlayMySound("changepage.wav");
      p3.init();
      InitStatus();
      break;
    default: break;
  }
  return false;
});

$(".down").click(function(){
  if (!loaded) return;
  gamecode = $( "#tabs" ).tabs( "option", "active" ) + 1;

  switch (gamecode)
  {
    case 1:
      if (!p1.is_loaded) break;
      if (p1.level === 20) break;
      p1.level++;
      $("#tabs-1 .scroll .lev-position").css("height", 15 * p1.level + 4);
      p1.change_level();
      PlayMySound("changepage.wav");
      p1.init();
      InitStatus();
      break;
    case 3:
      if (!p3.is_loaded) break;
      if (p3.level === 20) break;
      p3.level++;
      $("#tabs-3 .scroll .lev-position").css("height", 15 * p3.level + 4);
      p3.change_level();
      PlayMySound("changepage.wav");
      p3.init();
      InitStatus();
      break;
    default: break;
  }
  return false;
});

$("#btn-new").click(function(){
  if (!loaded) return;
  switch (gamecode)
  {
    case 1:
      if (!p1.is_loaded) break;
      p1.init();
      InitStatus();
      break;
    case 2:
      if (!p2.is_loaded) break;
      p2.init();
      InitStatus();
      break;
    case 3:
      if (!p3.is_loaded) break;
      p3.init();
      InitStatus();
      break;
    default: break;
  }
  return false;
});

$("#Spot_toolbar_button").click(function(){
  $("#Spot_color_dialog").toggle();
  if (!p2.is_loaded) return;
  p2.redraw();
});

$("#virtual_move").click(function(){
    if (virtual_buttons_moving === 0)
        {
           virtual_buttons_moving = 1;
           $("#virtual_move").removeClass().addClass("virtual_move_on");
        }
    else
        {
            virtual_buttons_moving = 0;
            $("#virtual_move").removeClass().addClass("virtual_move_off");
        }
});

document.onclick = function (event) {
  moveVirtualButtons(event);
  if (event.target.id === "virtual_move") return;
  else {
        virtual_buttons_moving = 0;
        $("#virtual_move").removeClass().addClass("virtual_move_off");
  }
}

$("#first-or-second").click(function(){
  let temp = $("#Player_is").text();
  $("#Player_is").text( $("#Computer_is").text() );
  $("#Computer_is").text(temp);
  temp = PlayerDlg.is;
  PlayerDlg.is = ComputerDlg.is;
  ComputerDlg.is = temp;
  return false;
});

$(".wraper2 .header button").click(function(){
  $("#Spot_color_dialog").css("display","none");
  if (!p2.is_loaded) return;
  p2.redraw();
  return false;
});

$("#tabs").tabs();

//		$(".main-window").css("display","block");

$("#btn-undo").click(function(){
  if (!loaded) return;
  // Move back.
        switch (gamecode)
        {
            case 1: // in Sokoban.
                if (!p1.is_loaded) break;
                if (p1.moves === 0) return;
                if (p1.level_is_completed === false) p1.Undo();
                break;
            
            case 2: // in Spot.

                break;
            
            case 3: // in Rotms.
                if (!p3.is_loaded) break;
                if (p3.moves === 0) return;
                if (p3.level_is_completed === false) p3.Undo();
                break;

            default: break;
        }
    //EnableMenuItem(GetMenu(hwnd), IDM_Undo, MF_GRAYED);
        //$(this).prop('disabled',true);
        this.disabled = true;
     });

//		$( "#tabs-1 .board" )
/*$(document).keydown(function(e) {
  if (!loaded) return;
  if (gamecode !== 1) return;
        if (!p1.is_loaded) return;
  e = e || window.event;
  switch(e.which || e.keyCode) {
    case 37: // left
      p1.movetop(75);
      break;

    case 38: // up
      p1.movetop(72);
      break;

    case 39: // right
      p1.movetop(77);
      break;

    case 40: // down
      p1.movetop(80);
      break;

    default: return; // exit this handler for other keys
  }
  e.preventDefault(); // prevent the default action (scroll / move caret) alert( "Handler for .keypress() called." );
  //InitStatus();
});*/

}
     