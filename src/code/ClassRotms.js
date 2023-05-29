import './ClassFire'  // Defining class fire
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
} from './functions.js';
import ClassFire from './ClassFire';

const A = window.A;
const B = window.B;

class ClassRotms {    
    level = 1;
    data_level = [];
    data_lev_gr = [];
    data_undo = [];
    starttime;
    curtime;
    htime;
    moves;
    score;
    score_undo;
    background;
    filename;
    curX;
    curY;
    flag_push = 0;
    error = 0;
    level_is_completed = false;
    is_loaded = 0;

    init() {
        loadDoc(this.filename);
        this.Level_to_Array();

        this.starttime = new Date();
        this.score = 0;
        this.score_undo = 0;
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
            PlayMySound("changepage.wav");
            this.init();    
        }
    }
    
    Undo() {    
        if (this.level_is_completed === true) return;
        for(var x=0; x<A; x++)
        {
            for(var y=0; y<B; y++)
                this.putthis(x, y, this.data_undo[x*B+y]);
        }
        this.score = this.score_undo;
        this.moves--;
    }
        
    member_last_move() {
        for(var x=0; x<A; x++)
            for(var y=0; y<B; y++)
                this.data_undo[x*B+y] = this.data_level[x*B+y];
        this.score_undo = this.score;
    }
    
    bild_ground() {        
        for(var x=0; x<A; x++)
            for(var y=0; y<B; y++)
            {
                switch (this.data_level[x*B+y])
                {
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5': this.data_lev_gr[x*B+y] = this.data_level[x*B+y]; break;
                    default:  this.data_lev_gr[x*B+y] = ' ';
                }
                this.putthis(x, y, this.data_level[x*B+y]);
            }        
    }
    
    change_level() {    
        this.filename = "G4W/rotms/lev" + this.level + ".rot";
    }
    
    // SaveGame(socfilename) {
    //     var handle;
    //     var length = A*B;
    //     var filename;

    //     if (window.Save_as_Flag) filename = socfilename;
    //         else filename = "G4W/save/" + socfilename;

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
    
    pushbutton(x, y) {
        if (this.data_level[x*B+y]>'0' && this.data_level[x*B+y]<'6')
        {
            this.flag_push=1;
            this.putthis(x, y, this.data_level[x*B+y]);
            this.curX=x;
            this.curY=y;
        }
        else return;
        switch (this.data_level[x*B+y])
        {
            case '1': this.member_last_move(); this.movetop('1'); break; // Left.
            case '2': this.member_last_move(); this.movetop('2'); break; // Right.
            case '3': this.member_last_move(); this.movetop('3'); break; // Up.
            case '4': this.member_last_move(); this.movetop('4'); break; // Down.
            case '5': this.member_last_move();
                    this.movetop('1'); // Left, Right, Up and Down (All).
                    this.movetop('2');
                    this.movetop('3');
                    this.movetop('4');
            default: break;
        }
        //Sleep(200);
        //this.fire_all_on_pushing(x, y); // Fires the rotms.
        setTimeout(function(){ this.state.p3.fire_all_on_pushing(x, y); }, 200);
    }
    
    movetop(key) {
        var Xtemp;
        var Ytemp;

        switch (key)
        {
            case '2': // Moving left.
                PlayMySound("move1.wav");
                for (Ytemp = this.curY - 1; ((this.data_level[this.curX * B + Ytemp] < '0')
                || (this.data_level[this.curX * B + Ytemp] > '5')) && (Ytemp > 0); Ytemp--);
                while(Ytemp !== this.curY - 1)
                {
                    if (this.data_level[this.curX * B + Ytemp] === ' ')
                    {
                        this.putthis(this.curX, Ytemp, this.data_level[this.curX * B + Ytemp+1]);
                        this.putthis(this.curX, Ytemp+1, ' ');
                    }
                    Ytemp++;
                }
                //EnableMenuItem(GetMenu(hwnd), IDM_Undo, MF_ENABLED);
                $("#btn-undo").prop('disabled',false);
                break;

            case '1': // Moving right.
                PlayMySound("move1.wav");
                for (Ytemp = this.curY + 1; ((this.data_level[this.curX * B + Ytemp] < '0')
                || (this.data_level[this.curX * B + Ytemp] > '5')) && (Ytemp < (B-1)); Ytemp++);
                while(Ytemp !== this.curY + 1)
                {
                    if (this.data_level[this.curX * B + Ytemp] === ' ')
                    {
                        this.putthis(this.curX, Ytemp, this.data_level[this.curX * B + (Ytemp-1)]);
                        this.putthis(this.curX, Ytemp-1, ' ');
                    }
                    Ytemp--;
                }
                //EnableMenuItem(GetMenu(hwnd), IDM_Undo, MF_ENABLED);
                $("#btn-undo").prop('disabled',false);
                break;

            case '3': // Moving up.
                PlayMySound("move1.wav");
                for (Xtemp = this.curX-1; ((this.data_level[Xtemp * B + this.curY] < '0')
                || (this.data_level[Xtemp * B + this.curY] > '5')) && (Xtemp > 0); Xtemp--);
                while(Xtemp !== this.curX - 1)
                {
                    if (this.data_level[Xtemp * B + this.curY] === ' ')
                    {
                        this.putthis(Xtemp, this.curY, this.data_level[(Xtemp+1) * B + this.curY]);
                        this.putthis(Xtemp + 1, this.curY, ' ');
                    }
                    Xtemp++;
                }
                //EnableMenuItem(GetMenu(hwnd), IDM_Undo, MF_ENABLED);
                $("#btn-undo").prop('disabled',false);
                break;

            case '4': // Moving down.
                PlayMySound("move1.wav");
                for (Xtemp = this.curX + 1; ((this.data_level[Xtemp * B + this.curY] < '0')
                || (this.data_level[Xtemp * B + this.curY] > '5')) && (Xtemp < (A-1)); Xtemp++);
                while(Xtemp !== this.curX+1)
                {
                    if (this.data_level[Xtemp * B + this.curY] === ' ')
                    {
                        this.putthis(Xtemp, this.curY, this.data_level[(Xtemp-1) * B + this.curY]);
                        this.putthis(Xtemp-1, this.curY, ' ');
                    }
                    Xtemp--;
                }
                //EnableMenuItem(GetMenu(hwnd), IDM_Undo, MF_ENABLED);
                $("#btn-undo").prop('disabled',false);
                break;

            default: break;
        }
    }

    redraw() {
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

        var str = "#tabs-3 div.board div:nth-child(" + (x*B+y+1) + ")";
        $(str).removeClass().addClass("div-rot-" + kode);
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
                if ((this.data_level[x*B+y]=='B') || (this.data_level[x*B+y]=='G')
                || (this.data_level[x*B+y]=='K') || (this.data_level[x*B+y]=='R')
                || (this.data_level[x*B+y]=='S') || (this.data_level[x*B+y]=='Y'))
                    return;
            }
        }
        PlayMySound("winer1.wav");

        $("#btn-undo").prop('disabled',true);
        
        setTimeout(function (){
        if (window.confirm("Level completed. Next level?") === true)
        {
            if (this.state.p3.level === 20) // If this is a last level.
            alert("Level completed. No more levels!");
            else
            {
                this.state.p3.level++;                
                $("#tabs-3 .scroll .lev-position").css("height", 15 * this.state.p3.level + 4);
                this.state.p3.change_level();  // Load next level.
                this.state.p3.NewGame(); // Play again.
            }
        }
        }, 500);
    }
    
    // My_Scrolling(wParam, lParam) {
    //     var prevlevel = this.level;
    //     switch (LOWORD(wParam))
    //     {
    //         case window.SB_LINEUP:
    //             if (this.level === 1)	return;
    //             else this.level--;
    //             break;
    //         case window.SB_LINEDOWN:
    //             if (this.level === 20) return;
    //             else this.level++;
    //             break;
    //         case window.SB_THUMBTRACK:
    //             this.level=HIWORD(wParam);
    //             break;
    //         case window.SB_PAGEUP:
    //             this.level-=1;
    //             if (this.level < 1) this.level=1;
    //             break;
    //         case window.SB_PAGEDOWN:
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
    // makeBackGround(hwnd1, this, str);
    }
    
    Level_to_Array() {
        for(var x=0; x < (A*B); x++) {
            this.data_level[x] = window.level_in_text_format[x];
        }
    }

    fire_all_on_pushing(x, y) {
        var Xtemp, Ytemp;
        switch (this.data_level[x*B+y])
        {
            case '5': this.moves-=3;
            case '2': // Search left.
                for (Ytemp=this.curY-1; ((this.data_level[this.curX*B+Ytemp] < '0')
                || (this.data_level[this.curX*B+Ytemp] > '5')) && (Ytemp>-1); Ytemp--);
                Ytemp++;
                while(Ytemp !== this.curY)
                {
                    if (this.data_level[x*B+Ytemp] !== ' ')
                        {
                            var tempfire = new ClassFire();
                            tempfire.fire(x, Ytemp);
                        }
                    Ytemp++;
                }
                this.moves++;
                this.check_end();
                if (this.data_level[x*B+y] === '2') break;

            case '1': // Search up.
                for (Ytemp=this.curY+1; ((this.data_level[this.curX*B+Ytemp] < '0')
                || (this.data_level[this.curX*B+Ytemp] > '5')) && (Ytemp<B); Ytemp++);
                Ytemp--;
                while(Ytemp !== this.curY)
                {
                    if (this.data_level[x*B+Ytemp] !== ' ')
                        {
                            var tempfire = new ClassFire();
                            tempfire.fire(x, Ytemp);
                        }
                    Ytemp--;
                }
                this.moves++;
                this.check_end();
                if (this.data_level[x*B+y] === '1') break;

            case '3': // Search left.
                for (Xtemp=this.curX-1; ((this.data_level[Xtemp*B+this.curY] < '0')
                || (this.data_level[Xtemp*B+this.curY] > '5')) && (Xtemp>-1); Xtemp--);
                Xtemp++;
                while(Xtemp !== this.curX)
                {
                    if (this.data_level[Xtemp*B+y] !== ' ')
                        {
                            var tempfire = new ClassFire();
                            tempfire.fire(Xtemp, y);
                        }
                    Xtemp++;
                }
                this.moves++;
                this.check_end();
                if (this.data_level[x*B+y] === '3') break;

            case '4': // Search down
                for (Xtemp=this.curX+1; ((this.data_level[Xtemp*B+this.curY] < '0')
                || (this.data_level[Xtemp*B+this.curY] > '5')) && (Xtemp<A); Xtemp++);
                Xtemp--;
                while(Xtemp !== this.curX)
                {
                    if (this.data_level[Xtemp*B+y] !== ' ')
                        {
                            var tempfire = new ClassFire();
                            tempfire.fire(Xtemp, y);
                        }
                    Xtemp--;
                }
                this.moves++;
                this.check_end();
                break;

            default: break;
        }
    }

}

export default ClassRotms;
