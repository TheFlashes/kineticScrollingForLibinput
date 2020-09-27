let lastDeltaY = [];
for (let i = 0; i < 50; i++) lastDeltaY.push({distance: 0,time: 0});

let lastScrollEventTime = 0;

let kineticScrollEnd = false;
let scrollLoop = false;

setInterval(() => {
    if (!scrollLoop && !kineticScrollEnd) {

        let averageScroll = 0;
        let addedScrolls = 0
        let timeNow = Date.now();
        lastDeltaY.forEach(deltaY => {
            if (timeNow - deltaY.time < 100) {
                averageScroll += deltaY.distance;
                addedScrolls++;
            }
        });
        averageScroll /= addedScrolls;

        console.log(addedScrolls);

        scrollLoop = setInterval(() => {
            window.scrollTo(0, window.scrollY + averageScroll);
            averageScroll -= 3;

            if (averageScroll < 0) {
                kineticScrollEnd = true;
                clearInterval(scrollLoop);
                scrollLoop = false;
            }
        }, 16);
    }
}, 50);

window.onwheel = function (ev) {
    if (scrollLoop) {
        clearInterval(scrollLoop);
        scrollLoop = false;
    }
    kineticScrollEnd = false;

    for (let i = 0; i < lastDeltaY.length; i++) {
        if (i != lastDeltaY.length - 1) {
            lastDeltaY[i].distance = lastDeltaY[i + 1].distance
            lastDeltaY[i].time = lastDeltaY[i + 1].time
        }
        else {
            lastDeltaY[i].distance = ev.deltaY;
            lastDeltaY[i].time = Date.now();
        }
    }
}
