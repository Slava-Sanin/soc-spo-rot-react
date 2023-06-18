import $ from 'jquery';

import {
    loadDoc,
    InitStatus,   
    Sound_On_Off,
    PlayMySound,
    Change_Player_color,
    Change_Computer_color,
    Sleep,
    GetColor,   
    moveVirtualButtons
} from './functions.js'

import SpotsLevels from "../Spot/levels.json";
import { Asp, Bsp } from './constants';

// For finding the best place to put spot.
const PLACE = {
    x : 0,
    y : 0,
    num : -1,
    next : 0
};

// Structure For Player and Computer data.
const st_Player = {
    spots : 0,
    color : 0,
    is : 0 //first or second moving
};

const PlayerDlg = Object.create(st_Player);
    PlayerDlg.color = 2;
    PlayerDlg.is = 1;

const ComputerDlg = Object.create(st_Player);
    ComputerDlg.color = 3;
    ComputerDlg.is = 2;

class ClassSpot {
    maxLevel = 20;
    data_lev_gr = []; //[Asp][Bsp];
    data_undo = []; //[Asp][Bsp];
    starttime;
    curtime;
    htime;
    moves;
    background = "";
    backgroundMode = 3;
    filename;
    curX;
    curY;
    Player = Object.create(st_Player);
    Computer = Object.create(st_Player);
    who_is_now;
    error;
    first_step = true;
    first_X;
    first_Y;
    kakoe_iz_odinakovux_vubrat = 0;
    first_time = true;
    best = Object.create(PLACE);
    ready;
    table = 1;
    refState;
    setState;

    //////////////////////////////////////////////////////////////////////////
    // Constructor builds a window, background and fills a map of level.
    //////////////////////////////////////////////////////////////////////////
    constructor()
    {
        this.table_was_changed = 0; // Background changed "table"/pictures.
        this.level = 1;
        this.data_level = SpotsLevels[this.level - 1].data.split('');
        this.Player.color = 2;      // Color of player by default.
        this.Computer.color = 3;    // Color of computer by default.
        this.level_is_completed = false;
        this.is_loaded = 0;
        this.init();
    }

    init() { 
        this.error=0;
        this.level_is_completed = false;
        this.data_level = SpotsLevels[this.level - 1].data.split('');
        this.starttime = new Date(); // Init. timer.
        this.moves = 0;
        this.Player.is = PlayerDlg.is;        // First or second?
        this.Computer.is = ComputerDlg.is;    // First or second?
        this.check_spots_number();            // Init. spots number.
        this.member_last_move();              // Save last moving.
        if (this.Computer.is === 1) {
            setTimeout(
                () => this.computer_move(),
                0
            );
        } // TODO: remove to run() function
        return 0;
    }

    NewGame() {
        if (this.moves)
        {
            PlayMySound("changepage.wav", this.refState.soundMode);
            this.init();
            if (this.ComputerDlg.is === 1)
            {
            // Sleep(700);
                this.computer_move();
                this.check_spots_number();
                //InitStatus();
            }
        }
    }

    Undo() {
        for(let x=0; x<Asp; x++)
        {
            for(let y=0; y<Bsp; y++)
            {
                this.data_level[x*Bsp+y] = this.data_undo[x*Bsp+y];
                if (this.data_level[x*Bsp+y] === '2') {this.curX = x; this.curY = y;}
                this.putthis(2, x, y, this.data_level[x*Bsp+y]);
            }
        }
        this.moves--;
        this.check_spots_number();
        //InitStatus();
    }

    member_last_move() {
        for(let x=0; x<Asp; x++)
            for(let y=0; y<Bsp; y++)
                this.data_undo[x*Bsp+y] = this.data_level[x*Bsp+y];
    }

    build_ground() {    
        for(let x=0; x<Asp; x++)
            for(let y=0; y<Bsp; y++)
            {
                switch (this.data_level[x*Bsp+y])
                {
                    case ' ':
                    case '1': this.data_lev_gr[x*Bsp+y] = this.data_level[x*Bsp+y]; break;
                    case '2':
                    case '3': this.curX = x; this.curY = y; break;
                    default:
                }
                this.putthis(2, x, y, this.data_level[x*Bsp+y]);
            }
    }

    change_level(dir) {
        if ((this.level + dir) < 1 || (this.level + dir) > SpotsLevels.length) return;
        this.level += dir;
        this.data_level = SpotsLevels[this.level - 1].data.split('');
    }

    SaveGame(filename) {
    }

    LoadGame(filename) {
        this.filename = filename;
        return this.init();
    }

    redraw() {
        if (!this.is_loaded) return;    
        for(let x=0; x<Asp; x++)
        {
            for(let y=0; y<Bsp; y++)
            {
                this.putthis(1, x, y, this.data_level[x*Bsp+y]);
            }
        }
    }

    fast_redraw() {

    }

    putthis(x, y, kode) {
        let kode_x, kode_y;
        let str;

        this.data_level[x*Bsp+y] = kode;

        switch (kode)
        {
            case '0': // Stown(border).
                str = "#tabs-2 div.board div:nth-child(" + (x*Bsp+y+1) + ")";
                $(str).removeClass().addClass("div-spo-"+kode);

                break;
            case ' ': // Empty place.
                kode = 'Z';
                if (this.table===2)
                {
                    str = "#tabs-2 div.board div:nth-child(" + (x*Bsp+y+1) + ")";
                    $(str).removeClass().addClass("div-spo-"+kode);
                }
                else
                {
                    str = "#tabs-2 div.board div:nth-child(" + (x*Bsp+y+1) + ")";
                    $(str).removeClass().addClass("div-spo-"+kode);
                }
                break;
            default:  // Player's or computer's spot.
                if (kode===2) kode = PlayerDlg.color;
                else kode = ComputerDlg.color;

                str = "#tabs-2 div.board div:nth-child(" + (x*Bsp+y+1) + ")";
                $(str).removeClass().addClass("div-spo-"+kode);

                break;
        }
    }

    retime() {
        if (this.level_is_completed) return this.htime/1000;
        this.curtime = new Date();
        this.htime = this.curtime - this.starttime;
        return this.htime/1000;
    }

    check_end() {
        if ((this.Player.spots !== 0) && (this.Computer.spots !== 0) && (!this.level_is_completed))
        {
            if ((this.who_is_now === 1) && (!this.player_cant_move)) return 0;

            for(let x=1; x<(Asp-1); x++)
                for(let y=1; y<(Bsp-1); y++)
                {
                    if (this.data_level[x*Bsp+y] === ' ') return 0;
                }
        }

        this.level_is_completed = true;
        console.log("Level is completed!");
        // Sleep(4000);
        setTimeout( () => {
        let result;
        // Checking for a winner.
        if (this.Player.spots === this.Computer.spots) result = "Teko!!!";
        else if (this.Player.spots < this.Computer.spots) result = "Computer won!!!";
            else if (this.Player.spots > this.Computer.spots)
                    {
                        PlayMySound("winner.wav", this.refState.soundMode);
                        result = "You are winner!!!";
                    }

        alert(result + "\n\n Party complete.");
        
        if (this.level === this.maxLevel) alert("Level complete. \n\n No more levels!");
        }, 500);
        return 1;
    }

    change_background(str) {
        //makeBackGround(hwnd1, this, str);
    }

    player_move(x, y) {
        let kode_x, kode_y;
        this.who_is_now = 1; // chey hod

        if (this.first_step || this.table_was_changed)
        {
            this.first_X = x;
            this.first_Y = y;
            if (this.data_level[x*Bsp+y] !== this.Player.color) return;
            PlayMySound("poper.wav", this.refState.soundMode);

        let str = "#tabs-2 div.board div:nth-child(" + (x*Bsp+y+1) + ")";
        let kode = this.data_level[x*Bsp+y];
        $(str).removeClass().addClass("div-spo-"+PlayerDlg.color+"big");

            this.first_step = false;
            this.table_was_changed = 0;
            return;
        }
        else
        {
            if ((x === this.first_X) && (y === this.first_Y)) // Same place. Drop down the spot.
            {
                this.putthis(1, x, y, this.Player.color);
                //-------gibuy for fast_draw-------
                this.putthis(2, x, y, this.Player.color);
                //---------------------------------
                this.first_step = true;
                return;
            }
            else
            {
                if (this.check_the_place(x, y, this.first_X, this.first_Y)) // If place is empty.
                {
                    this.member_last_move();
                    //EnableMenuItem(GetMenu(hwnd), IDM_Undo, MF_ENABLED);

                    if (Math.abs(this.first_X-x)===2 || Math.abs(this.first_Y-y)===2) // If spot jumps.
                    {
                        this.putthis(1, this.first_X, this.first_Y, ' ');
                        //-------gibuy for fast_draw-------
                        this.putthis(2, this.first_X, this.first_Y, ' ');
                        //---------------------------------
                    }
                    else // Draw new spot.
                    {
                        this.putthis(1, this.first_X, this.first_Y, this.Player.color);
                        //-------gibuy for fast_draw-------
                        this.putthis(2, this.first_X, this.first_Y, this.Player.color);
                        //---------------------------------
                    }
                        let str = "#tabs-2 div.board div:nth-child(" + (x*Bsp+y+1) + ")";
                        let kode = this.data_level[x*Bsp+y];
                        $(str).removeClass().addClass("div-spo-"+PlayerDlg.color+"big");

                    setTimeout(() => {
                            this.putthis(1, x, y, this.Player.color);
                            //-------gibuy for fast_draw-------
                            this.putthis(2, x, y, this.Player.color);
                            //---------------------------------

                            PlayMySound("move1.wav", this.refState.soundMode);
                            this.fill_around(x, y, this.Computer.color); // Paint around all enemy.
                            this.first_step = true;
                            this.check_spots_number();
                            //InitStatus();
                            if (this.level_is_completed) return;
                            //Sleep(1000);
                            //----computer is begining now----
                                this.computer_move();
                                this.moves++;

                                    console.log(this.ready);

                    console.log("after computer_move");
                                this.check_spots_number();
                                //InitStatus();
                    },500);
                    return;
                }

                this.putthis(1, this.first_X, this.first_Y, this.Player.color);
                //-------gibuy for fast_draw-------
                this.putthis(2, this.first_X, this.first_Y, this.Player.color);
                //---------------------------------
                this.first_step = true;
            }
        }
    }

    player_cant_move() {
        let x, y;
        console.log("Player spots: " + this.Player.spots);
        console.log("Computer spots: " + this.Computer.spots);
        for (x=1; x<(Asp-1); x++)
            for (y=1; y<(Bsp-1); y++)
            {
                if (this.data_level[x*Bsp+y] === this.Player.color)
                {
                    let i, j;
                    for (i=x-2; i<=(x+2); i++)
                        for (j=y-2; j<=(y+2); j++)
                        {
                            if (i<1 || i>=(Asp-1) || j<1 || j>=(Bsp-1)) continue;
                            if ((x === i) && (y === j)) continue;
                            if (this.data_level[i*Bsp+j] === ' ') return false;
                        }
                }
            }
            console.log("Player can't move");
        return true;
    }

    computer_move() {
        this.who_is_now = 2;
        let X_from, Y_from;
        let best = Object.create(PLACE);
        let choyse;
        let i,j;
        for (i=1; i<(Asp-1); i++)
        {
            for (j=1; j<(Bsp-1); j++)
            {
                if (this.data_level[i*Bsp+j] === this.Computer.color)
                {
                    choyse = this.check_around(i, j);
                    if (best.num < choyse.num)
                    {
                        best.x = choyse.x;
                        best.y = choyse.y;
                        best.num = choyse.num;
                        best.next = choyse.next;

                        X_from = i;
                        Y_from = j;
                    }
                }
            }
        }
        this.ready = false; //TODO: To delete later
        if (best.num !== -1) // If found place.
        {
        //Sleep(300);
            setTimeout(() => {
                this.draw_computer_moving(X_from, Y_from, best); // Computer moves.
                }, 1000);
        }
        else this.ready = true;  // TODO: To delete later
        console.log("exit from computer_move()"); // TODO: To delete later
    }

    draw_computer_moving(x, y, best) {
        PlayMySound("poper.wav", this.refState.soundMode);

        let str = "#tabs-2 div.board div:nth-child(" + (x*Bsp+y+1) + ")";
        let kode = this.data_level[x*Bsp+y];
        $(str).removeClass().addClass("div-spo-"+ComputerDlg.color+"big");
    //   Sleep(5000);
    setTimeout(() => {
        //-----------------------
        //console.log(best);
        if (Math.abs(best.x-x) === 2 || Math.abs(best.y-y) === 2)
        {
            this.putthis(1, x, y, ' ');
            //-------gibuy for fast_draw-------
            this.putthis(2, x, y, ' ');
        }
        else
        {
            this.putthis(1, x, y, this.Computer.color);
            //-------gibuy for fast_draw-------
            this.putthis(2, x, y, this.Computer.color);
            //---------------------------------
        }

        //-----------------------
        str = "#tabs-2 div.board div:nth-child(" + (best.x*Bsp+best.y+1) + ")";
        kode = this.data_level[best.x*Bsp+best.y];
        $(str).removeClass().addClass("div-spo-"+ComputerDlg.color+"big");
        //-----------------------

    setTimeout(() => {
        //-----------------------
        this.putthis(1, best.x, best.y, this.Computer.color);
        //-------gibuy for fast_draw-------
        this.putthis(2, best.x, best.y, this.Computer.color);
        //-----------------------

    setTimeout(() => {
        //-----------------------
        PlayMySound("move1.wav", this.refState.soundMode);
        this.fill_around(best.x, best.y, this.Player.color);

        }, 500);

        }, 500);

        }, 300);
    }

    check_around(x, y) {
        let i, j, bonus=0, num=0;
        let scolko_odinakovux=0;

        if (this.first_time) this.best.num=-1;

        for (i=x-2; i<=x+2; i++)
            for (j=y-2; j<=y+2; j++)
            {
                if (i<1 || i>=(Asp-1) || j<1 || j>=(Bsp-1)) continue;
                if ((x===i) && (y===j)) continue;
                if ((Math.abs(x-i) <= 1) && (Math.abs(y-j) <= 1)) bonus=1;
                else bonus=0;

                if (this.data_level[i*Bsp+j] === ' ')
                {
                    num = this.calculate_Players_spots_to_draw(i, j);
                    num += bonus;
                    if (num >= this.best.num)
                    {
                        if (this.first_time)
                        {
                            if (num > this.best.num) scolko_odinakovux = 1;
                            else scolko_odinakovux++;
                            this.best.num = num;
                        }
                        else
                        {
                            if (num === this.best.num)
                            {
                                scolko_odinakovux++;
                                if (scolko_odinakovux === this.kakoe_iz_odinakovux_vubrat)
                                {
                                    this.best.x = i;
                                    this.best.y = j;
                                    this.best.num = num;
                                    this.best.next = 0;
                                    this.first_time = true;
                                    return this.best;
                                }
                            }
                        }
                    }
                }
            }
        if (this.best.num !== -1)
        {
            this.kakoe_iz_odinakovux_vubrat = Math.floor(1 + (Math.random()*10 % scolko_odinakovux));
            this.first_time = false;
            this.check_around(x, y);
        }
        this.first_time = true;
        return this.best;
    }

    calculate_Players_spots_to_draw(x, y) {
        let i, j, num=0;
        for (i=x-1; i<=x+1; i++)
            for (j=y-1; j<=y+1; j++)
            {
                if (i<1 || i>=(Asp-1) || j<1 || j>=(Bsp-1)) continue;
                if ((x===i) && (y===j)) continue;
                if (this.data_level[i*Bsp+j] === this.Player.color) num++;
            }
        return num;
    }

    check_the_place(x, y, first_X, first_Y) {
        if (this.data_level[x*Bsp+y] !== ' ') return false;
        if (Math.abs(first_X-x)>2 || Math.abs(first_Y-y)>2) return false;
        return true;
    }

    fill_around(x, y, color) {
        let i, j;
        for (i=x-1; i<=x+1; i++)
            for (j=y-1; j<=y+1; j++)
                if (this.data_level[i*Bsp+j] === color)
                {
                        this.putthis(1, i, j, this.data_level[x*Bsp+y]);
                        //-------gibuy for fast_draw-------
                        this.putthis(2, i, j, this.data_level[x*Bsp+y]);
                }

        this.check_spots_number();

        if ((this.who_is_now === 2) && this.player_cant_move())
                                    {
                                        this.level_is_completed = true;
                                    }

        this.check_end();
    }

    check_spots_number() {
        this.Player.spots = 0;
        this.Computer.spots = 0;
        for(let x=1; x<Asp; x++)
            for(let y=1; y<Bsp; y++)
            {
                if (this.data_level[x*Bsp+y] === this.Player.color) this.Player.spots++;
                if (this.data_level[x*Bsp+y] === this.Computer.color) this.Computer.spots++;
            }
    }

}

export {
    PlayerDlg,
    ComputerDlg,
    ClassSpot
}
