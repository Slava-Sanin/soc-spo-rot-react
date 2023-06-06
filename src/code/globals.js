import ClassSokoban from "./ClassSokoban";
import {ClassSpot} from "./ClassSpot";
import ClassRotms from "./ClassRotms";
let
    Backgrounds = {
        backgroundDefault: "http://localhost:3000/static/media/GRAND11.28024d201c76f6f482b3.bmp",
        backgroundTab1: "http://localhost:3000/static/media/_47873efd-8680-4a97-a570-7515d034bc63.cc6cb989cae9d75543c8.jfif",
        backgroundTab2: "http://localhost:3000/static/media/GRAND13.d1dd2323807ab8ddc268.bmp",
        backgroundTab3: "http://localhost:3000/static/media/GRAND14.1e4201f6c1e48e68da7a.bmp",
    },
    CurPath = '',
    paintstruct = {},
    parts = [],
    gamecode = 0,
    loaded = 0,
    glob_sound = 1,
    status_line = 0,
    table = 1,
    Save_as_Flag = 0,
    level_in_text_format = "",
    timer = {},
    prev_game = 0,
    virtual_buttons_moving = 0,
    p1 = {},
    p2 = {},
    p3 = {};

export {
    Backgrounds,
    CurPath,
    paintstruct,
    parts,
    gamecode,
    loaded,
    glob_sound,
    status_line,
    table,
    Save_as_Flag,
    level_in_text_format,
    timer,
    prev_game,
    virtual_buttons_moving,
    p1,
    p2,
    p3
};