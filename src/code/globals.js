export
let
    host = "http://localhost:3000",
    CurPath= window.location.pathname,
    soundPath = "/static/sound/",
    Backgrounds= {
        //backgroundDefault: host + "/static/backgrounds/grand1.jpg",
        backgroundDefault: host + "/static/images/kandinsky-download-1686290078868.png",

        //backgroundTab1: host + "/static/backgrounds/grand2.jpg",
        backgroundTab1: host + "/static/images/kandinsky-download-1686290520138.png",

        //backgroundTab2: host + "/static/backgrounds/grand3.jpg",
        backgroundTab2: host + "/static/images/kandinsky-download-1686289628458.png",

        //backgroundTab3: host + "/static/backgrounds/grand4.jpg",
        backgroundTab3: host + "/static/images/kandinsky-download-1686291071861.png",
    },
    MaxLevel = {
        socoban: 20,
        spot: 1,
        rotms: 20
    },
    paintstruct= {},
    parts= [],
    gamecode= 0,
    loaded= 0,
    glob_sound= false,
    status_line= 0,
    table= 1,
    Save_as_Flag= 0,
    level_in_text_format= "",
    timer= {},
    prev_game= 0,
    PlayerDlg = {
        color: 2,
        is: 1
    },
    ComputerDlg = {
        color: 3,
        is: 2
    },
    virtual_buttons_moving= 0;


