var canvas = document.getElementById('example_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var imageObj = new Image();

imageObj.src = 'https://icons.iconarchive.com/icons/succodesign/love-is-in-the-web/48/heart-icon.png';
var c = canvas.getContext('2d');
var arrayObj = [];
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2
}
addEventListener('click', function(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    init(1000);
})
addEventListener(
    "pointerdown",
    (e) => {
        // Cache the client X/Y coordinates
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    },
);
addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.heigth = innerHeight;
})

function randomInRange(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function randomColor() {
    return "#" + Math.random().toString(16).substr(-6);
}
var gravity = 0.01;
var facility = 0.99;

function createObject(x, y, r, distance, velocity) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.distance = distance;
    this.velocity = velocity;
    this.color = randomColor();
    this.gravity = gravity
    this.alpha = 1;
    this.image = imageObj
    this.draw = () => {
        // c.save();
        // c.globalAlpha = this.alpha;
        // c.beginPath();
        // c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        // c.fillStyle = this.color;
        // c.fill();
        // c.strokeStyle = this.color;
        // c.stroke();
        // c.restore();
        c.drawImage(this.image, this.x, this.y);
    }
    this.update = () => {
        // if (this.x + this.r > canvas.width || this.x - this.r < 0) {
        //     this.velocity.x = -this.velocity.x;
        // }
        // if (this.y + this.r > canvas.height || this.y - this.r < 0) {
        //     this.velocity.y = -this.velocity.y;
        // }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += this.gravity;
        this.alpha -= 0.002;
        this.draw();
    }
}

function init(count) {
    // arrayObj = [];
    var increment = Math.PI * 2 / count;
    for (var i = 0; i < count; i++) {
        var r = Math.random() * 5;
        var x = mouse.x;
        var y = mouse.y;
        var distance = randomInRange(-100, 100);
        var velocity = {
            x: Math.sin(increment * i) * Math.random() * 7,
            y: Math.cos(increment * i) * Math.random() * 7
        }
        arrayObj.push(new createObject(x, y, r, distance, velocity));

    }
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(255,255,255,0.01)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    // c.clearRect(0, 0, canvas.width, canvas.height);
    console.log(arrayObj);
    arrayObj.forEach((obj, i) => {
        if (obj.alpha >= 0) {
            obj.update();
        } else {
            arrayObj.splice(i, 1);
        }
    })

}
// init();
animate();
