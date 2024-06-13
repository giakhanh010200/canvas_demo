var canvas = document.getElementById('example_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var count = 150;
var arrayCircle = [];
const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
}
var arrayColor = [
    '#FFBB5C',
    '#FF9B50',
    '#E25E3E',
    '#C63D2F',
]
addEventListener('mousemove', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    // init(count);
})
init(count);

function circleMotion(x, y, r, radians) {
    this.x = x;
    this.y = y;
    this.r = r;
    // this.distance = {
    //     x: randomInRange(50, 200),
    //     y: randomInRange(50, 200)
    // }
    this.distance = randomInRange(50, 150);
    this.radians = radians;
    this.velocity = 0.1;
    this.lastMouse = {
        x: x,
        y: y,
    }
    this.color = Math.floor(Math.random() * arrayColor.length);
    this.update = function() {
        const lastPoint = {
            x: this.x,
            y: this.y
        }
        this.lastMouse.x += (mouse.x - this.lastMouse.x) * this.velocity;
        this.lastMouse.y += (mouse.y - this.lastMouse.y) * this.velocity;
        this.radians += this.velocity;
        this.x = this.lastMouse.x + Math.cos(this.radians) * this.distance;
        this.y = this.lastMouse.y + Math.sin(this.radians) * this.distance;
        // this.y = y + Math.sin(this.radians) * 100;
        this.draw(lastPoint);
    }
    this.draw = lastPoint => {
        c.beginPath();
        c.strokeStyle = arrayColor[this.color];
        c.lineWidth = this.r;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(this.x, this.y);
        // c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        // c.fillStyle = arrayColor[this.color];
        // c.fill()
        // c.strokeStyle = arrayColor[this.color];
        c.stroke();
        c.closePath();
    }


}

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function init(count) {
    arrayCircle = [];
    for (var i = 0; i < count; i++) {
        let x = mouse.x;
        let y = mouse.y
        let r = Math.random() * 5;
        let radians = Math.random() * Math.PI * 2;
        arrayCircle.push(new circleMotion(x, y, r, radians));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255,255,255,0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);

    arrayCircle.forEach(circle => {
        circle.update();
    })
}
animate();