export
let
    host = "http://localhost:3000",
    CurPath= window.location.pathname,
    soundPath = "/static/sound/",
    Backgrounds= {
        backgroundDefault: host + "/static/backgrounds/grand1.jpg",
        //backgroundDefault: host + "/static/images/kandinsky-download-1686260629023.png",
        //backgroundDefault: host + "/static/backgrounds/_7bb09faf-2bc5-43c2-9c01-dccb9184e35d.jfif",

        //backgroundTab1: host + "/static/backgrounds/_47873efd-8680-4a97-a570-7515d034bc63.jfif",
        backgroundTab1: host + "/static/images/kandinsky-download-1686260629023.png",

        backgroundTab2: host + "/static/backgrounds/grand3.jpg",

        backgroundTab3: host + "/static/backgrounds/grand4.jpg",
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
    virtual_buttons_moving= 0;


