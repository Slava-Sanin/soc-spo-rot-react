import $ from 'jquery';
import {
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
} from './functions.js'

const A = window.A;
const B = window.B;

class ClassSocoban {
    level = 1;
    data_level = [];
    data_lev_gr = [];
    data_undo = [];
    starttime;
    curtime;
    htime;
    moves;
    background;
    filename;
    curX;
    curY;
    error = 0;
    level_is_completed = false;
    is_loaded = 0;


    init() {
        this.error = 0;
        window.loadDoc(this.filename);
        this.Level_to_Array();
        this.starttime = new Date();
        this.moves = 0;
        this.bild_ground();
        this.member_last_move();
        this.level_is_completed = false;
        $("#btn-undo").prop('disabled',true);
        return 0;
    }

    NewGame() {
        if (this.moves)
        {
            window.PlayMySound("changepage.wav");

            this.init();
        }
    }

    Undo() {
        if (this.level_is_completed === true) return;
        for(var x=0; x<A; x++)
        {
            for(var y=0; y<B; y++)
            {
                this.data_level[x*B+y] = this.data_undo[x*B+y];
                if (this.data_level[x*B+y] === '2') {this.curX=x; this.curY=y;}
                this.putthis(x, y, this.data_level[x*B+y]);
            }
        }
        this.moves--;
    }

    member_last_move() {
        for(var x=0; x<A; x++)
            for(var y=0; y<B; y++)
                this.data_undo[x*B+y] = this.data_level[x*B+y];
    }

    bild_ground() {
        // find cursor and bild the ground array
        for(var x=0; x<A; x++)
            for(var y=0; y<B; y++)
            {
                switch (this.data_level[x*B+y])
                {
                    case '1':
                    case '3': this.data_lev_gr[x*B+y] = this.data_level[x*B+y]; break;
                    case '2': this.curX = x; this.curY = y;
                    case '4':
                    case ' ': this.data_lev_gr[x*B+y] = ' '; break;
                    case '5': this.data_lev_gr[x*B+y] = '3';
                    default: break;
                }
                this.putthis(x, y, this.data_level[x*B+y]);
            }
    }

    change_level() {
        this.filename = "G4W/socoban/lev" + this.level + ".soc";
    }

    // SaveGame(socfilename)
    // {
    //     var handle;
    //     var length = A*B;
    //     var filename;

    //     if (window.Save_as_Flag) filename = socfilename;
    //     else filename = "G4W/save/" + socfilename;

    //     if ((handle = open(filename, O_WRONLY | O_CREAT | O_TRUNC, S_IREAD | S_IWRITE)) === -1)
    //     {
    //         alert(hwnd, "Can't create file!","ERROR!!!", MB_OK | MB_ICONERROR);
    //         return -1;
    //     }

    //     if (write(handle, this.data_level, A*B) !== length)
    //     {
    //         alert(hwnd, "Can't write file!", "ERROR!!!", MB_OK | MB_ICONERROR);
    //         close(handle);
    //         return -1;
    //     }

    //     close(handle);
    //     return 0;
    // }

    LoadGame(socfilename) {
        this.filename = socfilename;
        return this.init();
    }

    movetop(key)
    {
        switch (key)
        {
            case 75: // Moving left.
                if (this.data_level[this.curX*B+this.curY-1] === ' ' || this.data_level[this.curX*B+this.curY-1] === '3')
                {
                    this.member_last_move();

                $("#btn-undo").prop('disabled',false);
                    PlayMySound("move1.wav");
                    this.putthis(this.curX, this.curY-1, '2');
                    this.putthis(this.curX, this.curY, this.data_lev_gr[this.curX*B+this.curY]);
                    this.curY--;
                    this.moves++;
                    this.check_end();
                    break;
                }
                if ((this.data_level[this.curX*B+this.curY-1] === '4' || this.data_level[this.curX*B+this.curY-1] === '5')
                && (this.data_level[this.curX*B+this.curY-2] === ' ' || this.data_level[this.curX*B+this.curY-2] === '3'))
                {
                    this.member_last_move();

                    $("#btn-undo").prop('disabled',false);
                    PlayMySound("move_push.wav");
                    if (this.data_level[this.curX*B+this.curY-2] === ' ')
                        this.putthis(this.curX, this.curY-2, '4');
                    else
                        this.putthis(this.curX, this.curY-2, '5');
                    this.putthis(this.curX, this.curY-1, '2');
                    this.putthis(this.curX, this.curY, this.data_lev_gr[this.curX*B+this.curY]);
                    this.curY--;
                    this.moves++;
                    this.check_end();
                    break;
                }
                break;
            case 77: // Moving right.
                if (this.data_level[this.curX*B+this.curY+1] === ' ' || this.data_level[this.curX*B+this.curY+1] === '3')
                {
                    this.member_last_move();

                    $("#btn-undo").prop('disabled',false);
                    PlayMySound("move1.wav");
                    this.putthis(this.curX, this.curY+1, '2');
                    this.putthis(this.curX, this.curY, this.data_lev_gr[this.curX*B+this.curY]);
                    this.curY++;
                    this.moves++;
                    this.check_end();
                    break;
                }
                if ((this.data_level[this.curX*B+this.curY+1] === '4' || this.data_level[this.curX*B+this.curY+1] === '5')
                && (this.data_level[this.curX*B+this.curY+2] === ' ' || this.data_level[this.curX*B+this.curY+2] === '3'))
                {
                    this.member_last_move();

                    $("#btn-undo").prop('disabled',false);
                    PlayMySound("move_push.wav");
                    if (this.data_level[this.curX*B+this.curY+2] === ' ')
                        this.putthis(this.curX, this.curY+2, '4');
                    else
                        this.putthis(this.curX, this.curY+2, '5');
                    this.putthis(this.curX, this.curY+1, '2');
                    this.putthis(this.curX, this.curY, this.data_lev_gr[this.curX*B+this.curY]);
                    this.curY++;
                    this.moves++;
                    this.check_end();
                    break;
                }
                break;
            case 72: // Moving up.
                if (this.data_level[(this.curX-1)*B+this.curY] === ' ' || this.data_level[(this.curX-1)*B+this.curY] === '3')
                {
                    this.member_last_move();

                    $("#btn-undo").prop('disabled',false);
                    PlayMySound("move1.wav");
                    this.putthis(this.curX-1, this.curY, '2');
                    this.putthis(this.curX, this.curY, this.data_lev_gr[this.curX*B+this.curY]);
                    this.curX--;
                    this.moves++;
                    this.check_end();
                    break;
                }
                if ((this.data_level[(this.curX-1)*B+this.curY] === '4' || this.data_level[(this.curX-1)*B+this.curY] === '5')
                && (this.data_level[(this.curX-2)*B+this.curY] === ' ' || this.data_level[(this.curX-2)*B+this.curY] === '3'))
                {
                    this.member_last_move();

                    $("#btn-undo").prop('disabled',false);
                    PlayMySound("move_push.wav");
                    if (this.data_level[(this.curX-2)*B+this.curY] === ' ')
                        this.putthis(this.curX-2, this.curY, '4');
                    else
                        this.putthis(this.curX-2, this.curY, '5');
                    this.putthis(this.curX-1, this.curY, '2');
                    this.putthis(this.curX, this.curY, this.data_lev_gr[this.curX*B+this.curY]);
                    this.curX--;
                    this.moves++;
                    this.check_end();
                    break;
                }
                break;
            case 80: // Moving down.
                if (this.data_level[(this.curX+1)*B+this.curY] === ' ' || this.data_level[(this.curX+1)*B+this.curY] === '3')
                {
                    this.member_last_move();

                    $("#btn-undo").prop('disabled',false);
                    PlayMySound("move1.wav");
                    this.putthis(this.curX+1, this.curY, '2');
                    this.putthis(this.curX, this.curY, this.data_lev_gr[this.curX*B+this.curY]);
                    this.curX++;
                    this.moves++;
                    this.check_end();
                    break;
                }
                if ((this.data_level[(this.curX+1)*B+this.curY] === '4' || this.data_level[(this.curX+1)*B+this.curY] === '5')
                && (this.data_level[(this.curX+2)*B+this.curY] === ' ' || this.data_level[(this.curX+2)*B+this.curY] === '3'))
                {
                    this.member_last_move();

                    $("#btn-undo").prop('disabled',false);
                    PlayMySound("move_push.wav");
                    if (this.data_level[(this.curX+2)*B+this.curY] === ' ')
                        this.putthis(this.curX+2, this.curY, '4');
                    else
                        this.putthis(this.curX+2, this.curY, '5');
                    this.putthis(this.curX+1, this.curY, '2');
                    this.putthis(this.curX, this.curY, this.data_lev_gr[this.curX*B+this.curY]);
                    this.curX++;
                    this.moves++;
                    this.check_end();
                    break;
                }

                default: break;
        }
    }

    redraw() {
        // Drawing a map of current level.
        for(var x=0; x<A; x++)
        {
            for(var y=0; y<B; y++)
            {
                this.putthis(x, y, this.data_level[x*B+y]);
            }
        }
    }

    putthis(x, y, kode) {
        var kode_x, kode_y;

        this.data_level[x*B+y] = kode;

        if (kode === ' ') // Draws empty place.
        {
            kode = 'Z';
        }
        var str = "#tabs-1 div.board div:nth-child(" + (x*B+y+1) + ")";
        $(str).removeClass().addClass("div-soc-"+kode);
    }

    retime() {
        this.curtime = new Date();
        this.htime = this.curtime - this.starttime;
        return this.htime/1000;
    }

    check_end() {
        for(var x=0; x<A; x++)
        {
            for(var y=0; y<B; y++)
            {
                if (this.data_lev_gr[x*B+y] === '3' && this.data_level[x*B+y] !== '5')
                    return;
            }
        }

        PlayMySound("winer1.wav");

        $("#btn-undo").prop('disabled',true);
        // Delay before the confirm window is shown
        setTimeout(function (){
        if (window.confirm("Level completed. Next level?")  === true)
        {
            if (this.state.p1.level === 20) // If this is a last level.
                alert("Level completed. No more levels!");
            else
            {
                this.state.p1.level++;
                $("#tabs-1 .scroll .lev-position").css("height", 15 * this.state.p1.level + 4);
                this.state.p1.change_level();  // Load next level.
                this.state.p1.NewGame(); // Play again.
            }
        }
        }, 500);
    }

    // My_Scrolling(wParam, lParam) {
    //     var prevlevel = this.level;
    //     switch (LOWORD(wParam))
    //     {
    //         case SB_LINEUP:
    //             if (this.level === 1)	return;
    //             else this.level--;
    //             break;
    //         case SB_LINEDOWN:
    //             if (this.level === 20) return;
    //             else this.level++;
    //             break;
    //         case SB_THUMBTRACK:
    //             this.level = HIWORD(wParam);
    //             break;
    //         case SB_PAGEUP:
    //             this.level-=1;
    //             if (this.level < 1) this.level=1;
    //             break;
    //         case SB_PAGEDOWN:
    //             this.level+=1;
    //             if (this.level > 20) this.level=20;
    //             break;
    //         default:
    //             return;
    //     }
    //     if (prevlevel === this.level) return;

    //     PlayMySound("move.wav");
    //     this.change_level();               // Change and load level.
    //     this.init();                       // New game.
    // }

    change_background(str) {
    // makeBackGround(hwnd1, me, str);
    }

    Level_to_Array() {
         for(var x=0; x < (A*B); x++) {
                    this.data_level[x] = window.level_in_text_format[x];
                }
    }

}

export default ClassSocoban;