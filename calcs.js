function runCalcs() {
    // Get values from the input fields.
    let hor_res = document.getElementById("hor_res").value;
    let ver_res = document.getElementById("ver_res").value;
    let pix_size = document.getElementById("pix_size").value;
    let foc_len = document.getElementById("focal_length").value;
    let foc_dis = document.getElementById("focal_dist").value;
    let bas_dis = document.getElementById("baseline").value;


    let hor_size = sensorSize(hor_res, pix_size);
    document.getElementById("hor_size").innerHTML = hor_size;

    let ver_size = sensorSize(ver_res, pix_size);
    document.getElementById("ver_size").innerHTML = ver_size;

    let hor_FOV = fieldOfView(foc_len, hor_size);
    document.getElementById("hor_FOV").innerHTML = hor_FOV;

    let ver_FOV = fieldOfView(foc_len, ver_size);
    document.getElementById("ver_FOV").innerHTML = ver_FOV

    let hor_img = projectedLength(hor_FOV, foc_dis);
    document.getElementById("hor_img_size").innerHTML = hor_img;

    let ver_img = projectedLength(ver_FOV, foc_dis);
    document.getElementById("ver_img_size").innerHTML = ver_img;

    let proj_pix = ((hor_img*1000 / hor_res) + (ver_img*1000 / ver_res)) / 2;
    proj_pix = Math.round(proj_pix *1000)/1000;
    document.getElementById("proj_pix").innerHTML = proj_pix;

    let overlap = (hor_img - (bas_dis / 1000)) / hor_img;
    overlap = Math.round(overlap*100);
    document.getElementById("img_overlap").innerHTML = overlap;


}

function projectedLength(FOV, focal_dist) {
    let ang = FOV / 2;
    ang = ang * Math.PI / 180;
    let adj_side = focal_dist
    let opp_side = Math.tan(ang) * adj_side * 2;
    opp_side = Math.round(opp_side * 1000) / 1000;
    return opp_side;
}

function fieldOfView(focal_length, sensor_size) {
    let opp_side = sensor_size / 2;
    let adj_side = focal_length
    let deg = Math.atan(opp_side/adj_side);
    deg = deg * 2;
    deg = deg * 180 / Math.PI;
    deg = deg * 100;
    deg = Math.round(deg) / 100;
    return deg;
}


function sensorSize(pixels, pixel_size) {
    let size = pixels * pixel_size / 10;
    size = Math.round(size);
    size = size / 100;
    return size;
        //document.getElementById("demo").innerHTML = size;
    }

