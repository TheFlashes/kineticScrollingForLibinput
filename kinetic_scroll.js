let lastPosY = 0

window.addEventListener(`scroll`, (ev) => {
    let diff = window.scrollY - lastPosY
    lastPosY = window.scrollY
    console.log(diff);
});