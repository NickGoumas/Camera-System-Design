function runCalcs() {
    // Get values from the input fields.
    let hor_res = document.getElementById("hor_res").value;
    let ver_res = document.getElementById("ver_res").value;
    let pix_size = document.getElementById("pix_size").value;
    let foc_len = document.getElementById("focal_length").value;
    let foc_dis = document.getElementById("focal_dist").value;
    let bas_dis = document.getElementById("baseline").value;


    let hor_size = sensorSize(hor_res, pix_size);
    document.getElementById("hor_size").innerHTML = roundPlaces(hor_size, 1);

    let ver_size = sensorSize(ver_res, pix_size);
    document.getElementById("ver_size").innerHTML = roundPlaces(ver_size, 1);

    let hor_FOV = fieldOfView(foc_len, hor_size);
    document.getElementById("hor_FOV").innerHTML = roundPlaces(hor_FOV, 2);

    let ver_FOV = fieldOfView(foc_len, ver_size);
    document.getElementById("ver_FOV").innerHTML = roundPlaces(ver_FOV, 2);

    let hor_FOV_water = fieldOfView(foc_len, hor_size, 1.77/1.33);
    document.getElementById("hor_FOV_water").innerHTML = roundPlaces(hor_FOV_water, 2);

    let ver_FOV_water = fieldOfView(foc_len, ver_size, 1.77/1.33);
    document.getElementById("ver_FOV_water").innerHTML = roundPlaces(ver_FOV_water, 2);

    let hor_img = projectedLength(hor_FOV, foc_dis);
    document.getElementById("hor_img_size").innerHTML = roundPlaces(hor_img, 2);

    let ver_img = projectedLength(ver_FOV, foc_dis);
    document.getElementById("ver_img_size").innerHTML = roundPlaces(ver_img, 2);

    let hor_img_water = projectedLength(hor_FOV_water, foc_dis);
    document.getElementById("hor_img_size_water").innerHTML = roundPlaces(hor_img_water, 2);

    let ver_img_water = projectedLength(ver_FOV_water, foc_dis);
    document.getElementById("ver_img_size_water").innerHTML = roundPlaces(ver_img_water, 2);

    let proj_pix = ((hor_img*1000 / hor_res) + (ver_img*1000 / ver_res)) / 2;
    document.getElementById("proj_pix").innerHTML = roundPlaces(proj_pix, 2);

    let proj_pix_water = ((hor_img_water*1000 / hor_res) + (ver_img_water*1000 / ver_res)) / 2;
    document.getElementById("proj_pix_water").innerHTML = roundPlaces(proj_pix_water, 2);

    let overlap = (hor_img - (bas_dis / 1000)) / hor_img;
    overlap = Math.round(overlap*100);
    document.getElementById("img_overlap").innerHTML = overlap;

    let overlap_water = (hor_img_water - (bas_dis / 1000)) / hor_img_water;
    overlap_water = Math.round(overlap_water*100);
    document.getElementById("img_overlap_water").innerHTML = overlap_water;
}

function projectedLength(FOV, focal_dist) {
	let ang = FOV / 2;
	ang = ang * Math.PI / 180;
	let adj_side = focal_dist
	let opp_side = Math.tan(ang) * adj_side * 2;
	return opp_side;
}

function fieldOfView(focal_length, sensor_size, refrac_inx = 1) {
	let opp_side = sensor_size / 2;
	let adj_side = focal_length;
	let half_FOV_rad = Math.atan(opp_side/adj_side);
	half_FOV_rad = Math.asin(refrac_inx * Math.sin(half_FOV_rad));
	let FOV_rad = half_FOV_rad * 2;
	let FOV_deg = FOV_rad * 180 / Math.PI;
	return FOV_deg;
}

function sensorSize(pixels, pixel_size) {
	let size = pixels * pixel_size / 1000;
	return size;
}

function roundPlaces(value, places) {
	value = value * Math.pow(10, places);
	value = Math.round(value);
	value = value / Math.pow(10, places);
	return value;
}