import {
    loadDoc,
    InitStatus,   
    SomeArrow,
    Sound_On_Off,    
    PlayMySound,
    Sleep,
    moveVirtualButtons
} from './functions.js'
import SokobanLevels from "../Sokoban/levels.json";
import { A, B } from './constants';

class ClassSokoban {
    level = 1;
    maxLevel = 20;
    data_lev_gr = [];
    data_undo = [];
    starttime;
    curtime;
    htime;
    moves;
    background;
    backgroundMode = 3;
    filename;
    curX;
    curY;
    error = 0;
    level_is_completed;
    is_loaded = 0;
    refState;

    constructor() {
        this.init();
    }

    init() {
        this.error = 0;        
        this.data_level = SokobanLevels[this.level - 1].data.split('');
        this.starttime = new Date();
        this.moves = 0;
        this.build_ground();
        this.member_last_move();
        this.level_is_completed = false;
    }

    NewGame() {
        //if (this.moves)
        //{
            PlayMySound("changepage.wav", this.refState.soundMode);
            this.init();
        //}
    }

    Undo() {
        for(let x=0; x<A; x++)
        {
            for(let y=0; y<B; y++)
            {
                this.data_level[x*B+y] = this.data_undo[x*B+y];
                if (this.data_level[x*B+y] === '2') {this.curX=x; this.curY=y;}
                //this.putthis(x, y, this.data_level[x*B+y]);
            }
        }
        this.moves--;
        PlayMySound("move1.wav", this.refState.soundMode);
    }

    member_last_move() {
        for(let x=0; x<A; x++)
            for(let y=0; y<B; y++)
                this.data_undo[x*B+y] = this.data_level[x*B+y];
    }

    build_ground() {
        // find cursor and build the ground array
        for(let x=0; x<A; x++)
            for(let y=0; y<B; y++)
            {
                switch (this.data_level[x*B+y])
                {
                    case '1':
                    case '3': this.data_lev_gr[x*B+y] = this.data_level[x*B+y]; break;
                    case '2': this.curX = x; this.curY = y;
                    case '4':
                    case ' ': this.data_lev_gr[x*B+y] = ' '; break;
                    case '5': this.data_lev_gr[x*B+y] = '3';
                    default:
                }
                //this.putthis(x, y, this.data_level[x*B+y]);
            }
    }

    change_level(dir) {
        if ((this.level + dir) < 1 || (this.level + dir) > SokobanLevels.length) return;
        this.level += dir;
        //this.data_level = SokobanLevels[this.level - 1].data.split('');
        PlayMySound("changepage.wav", this.refState.soundMode);
        this.init();
    }

    SaveGame(filename) {
    }

    LoadGame(filename) {
        this.filename = filename;
        return this.init();
    }

    movetop(key)
    {
        switch (key)
        {
            case 75: // Moving left
                if (this.data_level[this.curX*B+this.curY-1] === ' ' || this.data_level[this.curX*B+this.curY-1] === '3')
                {
                    this.member_last_move();

                    this.refState.undoStates[0] = true;
                    PlayMySound("move1.wav", this.refState.soundMode);
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

                    this.refState.undoStates[0] = true;
                    PlayMySound("move_push.wav", this.refState.soundMode);
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
            case 77: // Moving right
                if (this.data_level[this.curX*B+this.curY+1] === ' ' || this.data_level[this.curX*B+this.curY+1] === '3')
                {
                    this.member_last_move();

                    this.refState.undoStates[0] = true;
                    PlayMySound("move1.wav", this.refState.soundMode);
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

                    this.refState.undoStates[0] = true;
                    PlayMySound("move_push.wav", this.refState.soundMode);
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
            case 72: // Moving up
                if (this.data_level[(this.curX-1)*B+this.curY] === ' ' || this.data_level[(this.curX-1)*B+this.curY] === '3')
                {
                    this.member_last_move();

                    this.refState.undoStates[0] = true;
                    PlayMySound("move1.wav", this.refState.soundMode);
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

                    this.refState.undoStates[0] = true;
                    PlayMySound("move_push.wav", this.refState.soundMode);
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
            case 80: // Moving down
                if (this.data_level[(this.curX+1)*B+this.curY] === ' ' || this.data_level[(this.curX+1)*B+this.curY] === '3')
                {
                    this.member_last_move();

                    this.refState.undoStates[0] = true;
                    PlayMySound("move1.wav", this.refState.soundMode);
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

                    this.refState.undoStates[0] = true;
                    PlayMySound("move_push.wav", this.refState.soundMode);
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

                default:
        }
    }

    /*redraw() {
        // Drawing a map of current level
        for(let x=0; x<A; x++)
        {
            for(let y=0; y<B; y++)
            {
                this.putthis(x, y, this.data_level[x*B+y]);
            }
        }
    }*/

    putthis(x, y, kode) {
        //let kode_x, kode_y;

        this.data_level[x*B+y] = kode;

        /*if (kode === ' ') // Draws empty place
        {
            kode = 'Z';
        }
        let str = "#tabs-1 div.board div:nth-child(" + (x*B+y+1) + ")";
        $(str).removeClass().addClass("div-sok-"+kode);*/
    }

    retime() {
        this.curtime = new Date();
        this.htime = this.curtime - this.starttime;
        return this.htime/1000;
    }

    check_end() {
        for(let x=0; x<A; x++)
        {
            for(let y=0; y<B; y++)
            {
                if (this.data_lev_gr[x*B+y] === '3' && this.data_level[x*B+y] !== '5')
                    return;
            }
        }

        PlayMySound("winer1.wav", this.refState.soundMode);

        this.refState.undoStates[0] = false;
        // Delay before the confirm window is shown
        setTimeout( () => {
        if (window.confirm("Level completed. Next level?")  === true)
        {
            if (this.level === this.maxLevel) // If this is a last level.
                alert("Level completed. No more levels!");
            else
            {
                //this.level++;
                // $("#tabs-1 .scroll .lev-position").css("height", 15 * this.level + 4);
                this.change_level(1);  // Load next level.
                //this.NewGame(); // Play again.
            }
        }
        }, 500);
    }

    // My_Scrolling(wParam, lParam) {
    //     let prevlevel = this.level;
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

}

export default ClassSokoban;