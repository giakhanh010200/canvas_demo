var canvas = document.getElementById("example_canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext("2d");
var arrayCircle = [];
var count = 100;
var gravity = 1;
var frictionY = 0.95;
var frictionX = 0.999;
var arrayColor = [
    '#9AC4F8',
    '#99EDCC',
    '#CB958E',
    '#E36588',
    '#9A275A'
]
renderCircle(count);

window.addEventListener('resize', function(event) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderCircle(count);
})

function drawCircle(x, y, r, dy, dx) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.color = Math.floor(Math.random() * arrayColor.length);
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = arrayColor[this.color];
        c.fill();
        c.stroke();
    }

    this.update = function() {

        if (this.y + this.r + this.dy > canvas.height) {
            this.dy = -this.dy * frictionY;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.r + this.dx > canvas.width || this.x - this.r <= 0) {
            this.dx = -this.dx;
        } else {
            this.dx = this.dx * frictionX;
        }
        // gravity = gravity * 2;
        this.y += this.dy;
        this.x += this.dx;
        // interactivity

        this.draw();
    }
}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderCircle(number) {
    arrayCircle = [];
    for (var i = 0; i < number; i++) {
        var r = Math.random() * 50;
        let x = randomInRange(r, canvas.width - r)
        let y = randomInRange(r, canvas.height - r)
        var dy = (Math.random() - 0.5) * 5;
        var dx = (Math.random() - 0.5) * 5;
        arrayCircle.push(new drawCircle(x, y, r, dy, dx));
    }
}

function animateCircle() {
    requestAnimationFrame(animateCircle);
    c.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < arrayCircle.length; i++) {
        arrayCircle[i].update();
    }
}
animateCircle();