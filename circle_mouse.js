var canvas = document.getElementById('example_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');
// ctx.fillRect(x,y,width,height);
// // line
// ctx.beginPath();
// ctx.moveTo(200, 100);
// ctx.lineTo(300, 200);
// ctx.lineTo(300, 50);
// ctx.strokeStyle = 'red';
// ctx.stroke();

// // arc / circle
// ctx.beginPath();
// ctx.arc(500, 400, 40, 0, Math.PI * 2, false);
// ctx.strokeStyle = 'brown';
// ctx.stroke();

// for (var i = 1; i <= 3; i++) {
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 40, 0, Math.PI * 2, false);
//     ctx.strokeStyle = randomColor();
//     ctx.stroke();
// }
var mouse = {
    x: undefined,
    y: undefined,
}
var maxRad = 40;
var minRad = 4;
var count = Math.floor((window.innerWidth + window.innerHeight) / 2)
extend(count);

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;

    });
window.addEventListener('resize', function(event) {
    count = Math.floor((window.innerWidth + window.innerHeight) / 2)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    extend(count);
})

function drawCircle(x, y, r, dx, dy) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.minRad = minRad
    this.sC = randomColor();
    this.fC = randomColor();
    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.strokeStyle = this.sC;
        ctx.fillStyle = this.fC;
        ctx.fill();
        ctx.stroke();
    }
    this.update = function() {

        if (this.x + this.r > innerWidth || this.x - this.r < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.r > innerHeight || this.y - this.r < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        // interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 & mouse.y - this.y > -50) {
            if (this.r < maxRad) {
                this.r += 1;
            }
        } else if (this.r > this.minRad) {
            this.r -= 1;
        }
        this.draw();

    }
}

function randomColor() {
    return "#" + Math.random().toString(16).substr(-6);
}

function extend(count) {
    arrayCircle = [];
    for (var i = 0; i < count; i++) {
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var r = Math.random() * minRad + 5;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;

        arrayCircle.push(new drawCircle(x, y, r, dx, dy));
    }
}



function animateCircle() {
    requestAnimationFrame(animateCircle);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].update();
    }
}
animateCircle();