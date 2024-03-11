document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("myCanvas");
    const context = canvas.getContext("2d");
    let isDrawing = false;

    // Eseménykezelés: egér és érintőképernyő eseményeket egyesítjük
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);

    canvas.addEventListener("touchstart", function (e) {
        simulateEvent(e, "mousedown");
    });

    canvas.addEventListener("touchmove", function (e) {
        simulateEvent(e, "mousemove");
    });

    canvas.addEventListener("touchend", function (e) {
        stopDrawing();
    });

    // Rajzoló függvények
    function startDrawing(e) {
        isDrawing = true;
        draw(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function draw(e) {
        if (!isDrawing) return;

        context.lineWidth = 5;
        context.lineCap = "round";
        context.strokeStyle = "#000";

        context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        context.stroke();
        context.beginPath();
        context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    function stopDrawing() {
        isDrawing = false;
        context.beginPath();
    }


    function simulateEvent(e, eventType) {
        const touch = e.touches[0];
        const simulatedEvent = new MouseEvent(eventType, {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(simulatedEvent);
        e.preventDefault();
    }
});