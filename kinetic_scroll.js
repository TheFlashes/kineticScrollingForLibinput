let lastDeltaY = [];
for (let i = 0; i < 50; i++) lastDeltaY.push({distance: 0,time: 0});

let lastScrollEventTime = 0;

let kineticScroll = null;
let scrollLoop = false;

const drag = 3;
const dragMultiplier = 1.02;
let currentDrag = drag;

window.onwheel = function (ev) {
    clearTimeout(kineticScroll);
    if (scrollLoop) {
        clearInterval(scrollLoop);
        scrollLoop = false;
    }

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

    kineticScroll = setTimeout(() => {
        let averageScroll = 0;
        let addedScrolls = 0
        let timeNow = Date.now();
        lastDeltaY.forEach(deltaY => {
            if (timeNow - deltaY.time < 200) {
                averageScroll += deltaY.distance;
                addedScrolls++;
            }
        });
        averageScroll /= addedScrolls;
        averageScroll /= 2;
        currentDrag = drag;

        let direction = ((averageScroll < 0) ? -1 : 1);

        averageScroll = Math.abs(averageScroll);

        scrollLoop = setInterval(() => {
            window.scrollBy(0, averageScroll * direction);
            averageScroll -= currentDrag;
            currentDrag *= dragMultiplier;

            console.log(averageScroll + " " + (averageScroll * -1));

            if (averageScroll < 0) {
                clearInterval(scrollLoop);
                scrollLoop = false;
            }
        }, 16);
    }, 30);
}
