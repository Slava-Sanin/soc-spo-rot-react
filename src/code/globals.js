
export
const
    host = "http://localhost:3000",
    Backgrounds= {
        /*backgroundDefault= "http=//localhost=3000/static/media/GRAND11.28024d201c76f6f482b3.bmp",
        backgroundTab1= "http=//localhost=3000/static/media/_47873efd-8680-4a97-a570-7515d034bc63.cc6cb989cae9d75543c8.jfif",
        backgroundTab2= "http=//localhost=3000/static/media/GRAND13.d1dd2323807ab8ddc268.bmp",
        backgroundTab3= "http=//localhost=3000/static/media/GRAND14.1e4201f6c1e48e68da7a.bmp",*/
        backgroundDefault: host + "/static/backgrounds/GRAND11.bmp",
        backgroundTab1: host + "/static/backgrounds/_47873efd-8680-4a97-a570-7515d034bc63.jfif",
        backgroundTab2: host + "/static/backgrounds/GRAND13.bmp",
        backgroundTab3: host + "/static/backgrounds/GRAND14.bmp",
    },
    CurPath= window.location.pathname,
    paintstruct= {},
    parts= [],
    gamecode= 0,
    loaded= 0,
    glob_sound= true,
    status_line= 0,
    table= 1,
    Save_as_Flag= 0,
    level_in_text_format= "",
    timer= {},
    prev_game= 0,
    virtual_buttons_moving= 0,
    p1= {},
    p2= {},
    p3= {};


