var canvas = document.getElementById('example_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
// c.fillRect(20, 20, 150, 100);
var count = 1;
var arrayRect = [];
const mouse = {
    x: undefined,
    y: undefined
}

addEventListener('mousemove', function(event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

var mouseRect = new createRect(undefined, undefined, 100, 100, 'red');

function createRect(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.draw = function() {
        c.fillStyle = this.color;
        c.fillRect(this.x, this.y, this.w, this.h);
    }
    this.update = function() {
        this.draw();
    }
}
init(count);

function init(count) {
    arrayRect = [];
    for (var i = 0; i < count; i++) {
        let x = 200;
        let y = 200;
        let w = 100;
        let h = 100;
        arrayRect.push(new createRect(x, y, w, h, 'black'));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    mouseRect.x = mouse.x;
    mouseRect.y = mouse.y;
    mouseRect.update();
    for (var i = 0; i < arrayRect.length; i++) {
        arrayRect[i].update();
    }
}
animate();