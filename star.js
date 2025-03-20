let isDragging = false;
let offsetX = 0;
let offsetY = 0;
const draggable = document.getElementById("draggable");
const sideMenu = document.getElementById("sideMenu");

draggable.addEventListener("mousedown", function (e) {
isDragging = true;
const rect = draggable.getBoundingClientRect();
offsetX = e.clientX - rect.left;
offsetY = e.clientY - rect.top;

document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDragging);

draggable.querySelector(".star").style.opacity = "1"; 
});

function drag(e) {
    if (isDragging) {
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;

        const maxX = window.innerWidth - draggable.offsetWidth;
        const maxY = window.innerHeight - draggable.offsetHeight;

        x = Math.min(Math.max(0, x), maxX);
        y = Math.min(Math.max(0, y), maxY);

        draggable.style.left = `${x}px`;
        draggable.style.top = `${y}px`;
        draggable.style.transition = 'none';
    }
}

function stopDragging() {
isDragging = false;
document.removeEventListener("mousemove", drag);
document.removeEventListener("mouseup", stopDragging);

moveToEdge();

draggable.querySelector(".star").style.opacity = "0.6";
}

function moveToEdge() {
    const rect = draggable.getBoundingClientRect();
    const distanceLeft = rect.left;
    const distanceRight = window.innerWidth - (rect.left + rect.width);
    const distanceTop = rect.top;
    const distanceBottom = window.innerHeight - (rect.top + rect.height);

    let targetX = rect.left;
    let targetY = rect.top;

    if (distanceLeft < distanceRight && distanceLeft < distanceTop && distanceLeft < distanceBottom) {
        targetX = 0;
    } else if (distanceRight < distanceLeft && distanceRight < distanceTop && distanceRight < distanceBottom) {
        targetX = window.innerWidth - rect.width;
    }

    if (distanceTop < distanceBottom && distanceTop < distanceLeft && distanceTop < distanceRight) {
        targetY = 0;
    } else if (distanceBottom < distanceTop && distanceBottom < distanceLeft && distanceBottom < distanceRight) {
        targetY = window.innerHeight - rect.height;
    }

    draggable.style.transition = 'all 0.5s ease-out';
    draggable.style.left = `${targetX}px`;
    draggable.style.top = `${targetY}px`;
}

draggable.addEventListener("click", function () {
    if (!isDragging) {
        toggleSideMenu();
    }
});

function toggleSideMenu() {
    sideMenu.classList.toggle("open");
}

function closeSideMenu() {
    sideMenu.classList.remove("open");
}