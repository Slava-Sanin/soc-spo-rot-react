import $ from 'jquery';
import {PlayerDlg, ComputerDlg} from "./globals";
import {level_in_text_format, glob_sound, virtual_buttons_moving, soundPath} from './globals';

/*function loadDoc(filename) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        let level_in_text_format = xhttp.responseText;
    }
  };
  xhttp.open("GET", filename, false);
  xhttp.send();
}*/


function InitStatus(props)
{
    let str1;
    let str2;
    let str3;
    let str4;
    let sec,s;
    let gamecode = props.selectedTab + 1;
    
    switch (gamecode)
    {
        case 0: // Empty Status bar.
            return (<div> Try to play!!! </div>);

        case 1: // Sokoban status
            sec = props.p1.retime();
            s = parseInt(sec%60);
            //str1 = "Time of game: " + parseInt(sec/3600) + ":" + parseInt(sec/60%60) + ":" + parseInt(sec%60);
            str1 = `Time of game: ${parseInt(sec/3600)} Hours, ${parseInt(sec/60%60)} Minutes, ${(s<10)?'0'+s:s} Seconds`;
            str2 = "Level: " + props.p1.level;
            str3 = "Moves made: " + props.p1.moves;
            return (<div id="status_sokoban"> <div className="time"> {str1} </div><div className="level"> {str2} </div><div className="moves"> {str3} </div></div>);

        case 2: // Spot status
            sec = props.p2.retime();
            s = parseInt(sec%60);
            props.p2.check_spots_number();
            str1 = ` ${parseInt(sec/3600)} Hours, ${parseInt(sec/60%60)} Minutes, ${(s<10)?'0'+s:s} Seconds`;

            let playerIs = props.p2.Player.is === 1 ? "first" : "second";
            //str2 = "Player(" + me_is + ")<br/> " + props.p2.Player.spots;
           
            let computerIs = props.p2.Computer.is === 1 ? "first" : "second";
            //str3 = "Computer(" + me_is + ")<br/> " + props.p2.Computer.spots;

            return (
                <div id="status_spot">
                    <div className="time">Time of game<br/> {str1} </div>
                    <div className="player">
                        <span style={{color: GetColor(PlayerDlg.color)}}>Player</span>
                        <span style={{fontWeight: "lighter"}}> ({playerIs})</span>
                        <div id="player-score">{props.p2.Player.spots}</div>
                    </div>
                    <div className="player">
                        <span style={{color: GetColor(ComputerDlg.color)}}>Computer</span>
                        <span style={{fontWeight: "lighter"}}> ({computerIs})</span>
                        <div id="computer-score">{props.p2.Computer.spots}</div>
                    </div>
                </div>
            );

        case 3: // Rotms status
            sec = props.p3.retime();
            s = parseInt(sec%60);
            str1 = `Time of game: ${parseInt(sec/3600)} Hours, ${parseInt(sec/60%60)} Minutes, ${(s<10)?'0'+s:s} Seconds`;
            str2 = "Level: " + props.p3.level;
            str3 = "Moves: " + props.p3.moves;
            str4 = "Score: " + props.p3.score;
            return (<div id="status_rotms"> <div className="time"> {str1} </div><div className="level"> {str2} </div><div className="moves"> {str3} </div><div className="score"> {str4} </div></div>);

        default: break;
    }
}


function PlayMySound(soundName, soundMode)
{
    if (soundMode)
    {
        let myAudio = new Audio(soundPath + soundName);
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
    //if (virtual_buttons_moving) $("div.virtual_buttons").css("left", x).css("top", y).css("position","fixed");
    $("div.virtual_buttons").css("left", x).css("top", y).css("position","fixed");
}

export {
    //loadDoc,
    InitStatus,   
    //Sound_On_Off,
    PlayMySound,
    Change_Player_color,
    Change_Computer_color,
    Sleep,
    GetColor,   
    moveVirtualButtons
}