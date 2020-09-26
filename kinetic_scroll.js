let lastDeltaY = [0, 0, 0]
let lastScrollEventTime = 0;

window.onwheel = function (ev) {
    lastDeltaY[0] = lastDeltaY[1];
    lastDeltaY[1] = lastDeltaY[2];
    lastDeltaY[2] = ev.deltaY;

    //console.log(Date.now() - lastScrollEventTime + " " + lastDeltaY[0]);
    console.log(lastDeltaY)
    lastScrollEventTime = Date.now();
}