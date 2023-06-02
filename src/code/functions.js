import $ from 'jquery';
import { PlayerDlg, ComputerDlg } from './ClassSpot';
import { level_in_text_format, glob_sound, virtual_buttons_moving } from './globals';

function loadDoc(filename) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        level_in_text_format = xhttp.responseText;
    }
  };
  xhttp.open("GET", filename, false);
  xhttp.send();
}


function InitStatus(props)
{
    let str1;
    let str2;
    let str3;
    let str4;
    let sec;
    let gamecode = props.selectedTab + 1;
    
    switch (gamecode)
    {
        case 0: // Empty Status bar.
            return (<div> Try to play!!! </div>);

        case 1: // Socoban status
            sec = props.p1.retime();
            str1 = `Time of game: ${parseInt(sec/3600)} Hours, ${parseInt(sec/60%60)} Minutes, ${parseInt(sec%60)} Seconds`;
            str2 = "Level: " + props.p1.level;
            str3 = "Moves maked: " + props.p1.moves;
            return (<div id="status_socoban"> <div className="time"> {str1} </div><div className="level"> {str2} </div><div className="moves"> {str3} </div></div>);

        case 2: // Spot status
            sec = props.p2.retime();
            props.p2.check_spots_number();
            //str1 = "Time of game: " + parseInt(sec/3600) + ":" + parseInt(sec/60%60) + ":" + parseInt(sec%60);
            str1 = `Time of game: ${parseInt(sec/3600)} Hours, ${parseInt(sec/60%60)} Minutes, ${parseInt(sec%60)} Seconds`;

            let me_is;
            me_is = props.p2.Player.is === 1 ? "First" : "Second";
            str2 = "Player(" + me_is + "): " + props.p2.Player.spots;
           
            me_is = props.p2.Computer.is === 1 ? "First" : "Second";
            str3 = "Computer(" + me_is + "): " + props.p2.Computer.spots;

            return (<div id="status_spot"><div className="time"> {str1} </div><div className="player" style={{color: "{GetColor(PlayerDlg.color)}"}}> {str2} </div><div className="player" style={{color: "{GetColor(ComputerDlg.color)}"}}> {str3} </div></div>);

        case 3: // Rotms status
            sec = props.p3.retime();
            //str1 = "Time of game: " + parseInt(sec/3600) + ":" + parseInt(sec/60%60) + ":" + parseInt(sec%60);
            str1 = `Time of game: ${parseInt(sec/3600)} Hours, ${parseInt(sec/60%60)} Minutes, ${parseInt(sec%60)} Seconds`;
            str2 = "Level: " + props.p3.level;
            str3 = "Moves: " + props.p3.moves;
            str4 = "Score: " + props.p3.score;
            return (<div id="status_rotms"> <div className="time"> {str1} </div><div className="level"> {str2} </div><div className="moves"> {str3} </div><div className="score"> {str4} </div></div>);

        default: break;
    }
}

function SomeArrow(props)
{
    let elem = $(this);
    let x = (elem[0].offsetTop - 53) / 25; console.log(x);
    let y = (elem[0].offsetLeft - 5) / 25; console.log(y);
    props.p3.pushbutton(x, y);
}


function Sound_On_Off()
{
    if (glob_sound)
    {
        glob_sound = 0;        
        $("#btn-sound").addClass("no-sound");
        return;
    }
    else {
            glob_sound = 1;            
            $("#btn-sound").removeClass("no-sound");
         }
}


function PlayMySound(soundname)
{
    if (glob_sound)
    {        
        let myAudio = new Audio("G4W/sound/" + soundname);
        myAudio.play();
    }
}


function Change_Player_color()
{
    PlayerDlg.color = document.forms["Player"].color.value;
    if (PlayerDlg.color === ComputerDlg.color)
    {
        ComputerDlg.color++;
        if (ComputerDlg.color > 6) ComputerDlg.color = 2;
        document.forms["Computer"].elements[ComputerDlg.color-2]["checked"] = true;

        //console.log(document.forms["Computer"].elements[ComputerDlg.color-2]);
    }  
    $(".Spot_color.left").css("background", "url('G4W/images/Spot/spots.png') -80px -" + 40*PlayerDlg.color + "px no-repeat black");
    $(".Spot_color.right").css("background", "url('G4W/images/Spot/spots.png') -80px -" + 40*ComputerDlg.color + "px no-repeat black");
}


function Change_Computer_color()
{
    //console.log(document.forms["Computer"].color.value);

    ComputerDlg.color = document.forms["Computer"].color.value;
    if (ComputerDlg.color === PlayerDlg.color)
    {
        PlayerDlg.color++;
        if (PlayerDlg.color > 6) PlayerDlg.color = 2;
        document.forms["Player"].elements[PlayerDlg.color-2]["checked"] = true;

        //console.log(document.forms["Player"].elements[PlayerDlg.color-2]);
    }
    $(".Spot_color.left").css("background", "url('G4W/images/Spot/spots.png') -80px -" + 40*PlayerDlg.color + "px no-repeat black");
    $(".Spot_color.right").css("background", "url('G4W/images/Spot/spots.png') -80px -" + 40*ComputerDlg.color + "px no-repeat black");
}


function Sleep(milliseconds)
{
  let start = new Date().getTime();
  do
  {
    if ((new Date().getTime() - start) > milliseconds) return;
  }
  while(1);
}


function GetColor(color)
{
    switch (color) {
        case 2:  return "red";
        case 3:  return "blue";
        case 4:  return "cadetblue";
        case 5:  return "yellow";
        case 6:  return "green";
        case 7:  return "yellow";
        default: break;
    }
}

function moveVirtualButtons(e)
{
    //e.preventDefault();
    let x = e.clientX - 137/2;
    let y = e.clientY - 137/2;
    if (virtual_buttons_moving) $("div.virtual_buttons").css("left", x).css("top", y).css("position","fixed");
}

export {
    loadDoc,
    InitStatus,   
    SomeArrow,
    Sound_On_Off,    
    PlayMySound,
    Change_Player_color,
    Change_Computer_color,
    Sleep,
    GetColor,   
    moveVirtualButtons
}