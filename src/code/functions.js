import $ from 'jquery';

function loadDoc(filename) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
        window.level_in_text_format = xhttp.responseText;
    }
  };
  xhttp.open("GET", filename, false);
  xhttp.send();
}


function InitStatus()
{
    var str1;
    var str2;
    var str3;
    var str4;
    var sec;

    window.gamecode = $("#tabs").tabs("option", "active") + 1;

    if (window.gamecode === 2) $(".Spot_toolbar").css("display","block");
    else $(".Spot_toolbar").css("display","none");

    if (!window.loaded) return;

    if (window.gamecode === 1) $(".virtual_buttons").css("display","block");
        else $(".virtual_buttons").css("display","none");

    switch (window.gamecode)
    {
        case 0: // Empty Status bar.
            if (window.prev_game !== 0)
            {

            }
            $(".status").text("Try to play!!!");
            window.prev_game = window.gamecode;
            return;

        case 1: // Socoban status.
            if (window.prev_game !== 1)
            {

            }
            if (!this.state.p1.is_loaded) { $(".status").text("Try to play!!!"); break; }
            sec = this.state.p1.retime();
            str1 = "Time of game: " + parseInt(sec/3600) + ":" + parseInt(sec/60%60) + ":" + parseInt(sec%60);
            str2 = "Level: " + this.state.p1.level;
            str3 = "Moves maked: " + this.state.p1.moves;
            $(".status").html('<div id="status_socoban"> <div className="time">' + str1 +'</div><div className="level">' + str2 + '</div><div className="moves">' + str3 + '</div></div>');
            break;

        case 2: // Spot status.
           
            if (!this.state.p2.is_loaded) { $(".status").text("Try to play!!!"); break; }
           
            sec = this.state.p2.retime();
            this.state.p2.check_spots_number();
            str1 = "Time of game: " + parseInt(sec/3600) + ":" + parseInt(sec/60%60) + ":" + parseInt(sec%60);
           
            let me_is;
            me_is = this.state.p2.Player.is === 1 ? "First" : "Second";
            str2 = "Player(" + me_is + "): " + this.state.p2.Player.spots;
           
            me_is = this.state.p2.Computer.is === 1 ? "First" : "Second";
            str3 = "Computer(" + me_is + "): " + this.state.p2.Computer.spots;

            $(".status").html('<div id="status_spot"><div className="time">' + str1 +'</div><div className="player" style="color:' + GetColor(window.PlayerDlg.color) + '">' + str2 + '</div><div className="player" style="color:' + GetColor(window.ComputerDlg.color) + '">' + str3 + '</div></div>');

            break;

        case 3: // Rotms status.
            if (window.prev_game !== 3)
            {

            }
            if (!this.state.p3.is_loaded) { $(".status").text("Try to play!!!"); break; }
            sec = this.state.p3.retime();
            str1 = "Time of game: " + parseInt(sec/3600) + ":" + parseInt(sec/60%60) + ":" + parseInt(sec%60);
            str2 = "Level: " + this.state.p3.level;
            str3 = "Moves: " + this.state.p3.moves;
            str4 = "Score: " + this.state.p3.score;
            $(".status").html('<div id="status_rotms"> <div className="time">' + str1 +'</div><div className="level">' + str2 + '</div><div className="moves">' + str3 + '</div><div className="score">' + str4 + '</div></div>');

            break;

        default: break;

    }

    window.prev_game = window.gamecode;
}


function SomeArrow()
{
    let elem = $(this);
    let x = (elem[0].offsetTop - 53) / 25; console.log(x);
    let y = (elem[0].offsetLeft - 5) / 25; console.log(y);
    this.state.p3.pushbutton(x, y);
}


function Sound_On_Off()
{
    if (window.glob_sound)
    {
        window.glob_sound = 0;        
        $("#btn-sound").addClass("no-sound");
        return;
    }
    else {
            window.glob_sound = 1;            
            $("#btn-sound").removeClass("no-sound");
         }
}


function PlayMySound(soundname)
{
    if (window.glob_sound)
    {        
        var myAudio = new Audio("G4W/sound/" + soundname);
        myAudio.play();
    }
}


function Change_Player_color()
{
    window.PlayerDlg.color = document.forms["Player"].color.value;
    if (window.PlayerDlg.color === window.ComputerDlg.color)
    {
        window.ComputerDlg.color++;
        if (window.ComputerDlg.color > 6) window.ComputerDlg.color = 2;
        document.forms["Computer"].elements[window.ComputerDlg.color-2]["checked"] = true;

        //console.log(document.forms["Computer"].elements[ComputerDlg.color-2]);
    }  
    $(".Spot_color.left").css("background", "url('G4W/images/Spot/spots.png') -80px -" + 40*window.PlayerDlg.color + "px no-repeat black");
    $(".Spot_color.right").css("background", "url('G4W/images/Spot/spots.png') -80px -" + 40*window.ComputerDlg.color + "px no-repeat black");
}


function Change_Computer_color()
{
    //console.log(document.forms["Computer"].color.value);

    window.ComputerDlg.color = document.forms["Computer"].color.value;
    if (window.ComputerDlg.color === window.PlayerDlg.color)
    {
        window.PlayerDlg.color++;
        if (window.PlayerDlg.color > 6) window.PlayerDlg.color = 2;
        document.forms["Player"].elements[window.PlayerDlg.color-2]["checked"] = true;

        //console.log(document.forms["Player"].elements[PlayerDlg.color-2]);
    }
    $(".Spot_color.left").css("background", "url('G4W/images/Spot/spots.png') -80px -" + 40*window.PlayerDlg.color + "px no-repeat black");
    $(".Spot_color.right").css("background", "url('G4W/images/Spot/spots.png') -80px -" + 40*window.ComputerDlg.color + "px no-repeat black");
}


function Sleep(milliseconds)
{
  var start = new Date().getTime();
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
    if (window.virtual_buttons_moving) $("div.virtual_buttons").css("left", x).css("top", y).css("position","fixed");
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