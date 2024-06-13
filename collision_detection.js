var canvas = document.getElementById('example_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var count = 200;
var mouse = {
    x: undefined,
    y: undefined,
}
var arrayColor = [
    '#9AC4F8',
    '#99EDCC',
    '#CB958E',
    '#E36588',
    '#9A275A'
]
var mouseCircle = new drawCircle(undefined, undefined, 10, 0, 0, 'red');
var arrayCircle = [];
var arrayRangeCircle = [];

init(count);
window.addEventListener('click', function(event) {

})
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        dx: velocity.dx * Math.cos(angle) - velocity.dy * Math.sin(angle),
        dy: velocity.dx * Math.sin(angle) + velocity.dy * Math.cos(angle)
    }
    return rotatedVelocities;
}

function resolveCollision(circle, otherCircle) {
    const xVelDif = circle.velocity.dx - otherCircle.velocity.dx;
    const yVelDif = circle.velocity.dy - otherCircle.velocity.dy;

    const xDif = otherCircle.x - circle.x;
    const yDif = otherCircle.y - circle.y;

    //prevent accidental overlap of circle
    if ((xDif * xVelDif + yDif * yVelDif) >= 0) {
        // grab angle between the two colliding circle
        // hàm atan2, 
        const angle = -Math.atan2(otherCircle.y - circle.y, otherCircle.x - circle.x);
        // store mass for better readability in collision equation
        const m1 = circle.mass;
        const m2 = otherCircle.mass;

        const u1 = rotate(circle.velocity, angle);
        const u2 = rotate(otherCircle.velocity, angle);
        // velocity before equation
        const v1 = {
            dx: u1.dx * ((m1 - m2) / (m1 + m2)) + u2.dx * 2 * m2 / (m1 + m2),
            dy: u1.dy
        }
        const v2 = {
            dx: u2.dx * ((m1 - m2) / (m1 + m2)) + u1.dx * 2 * m2 / (m1 + m2),
            dy: u2.dy
        }
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        circle.velocity.dx = vFinal1.dx;
        circle.velocity.dy = vFinal1.dy;

        otherCircle.velocity.dx = vFinal2.dx;
        otherCircle.velocity.dy = vFinal2.dy;
    }
}

function drawCircle(x, y, r, dx, dy, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velocity = {
        dx: (Math.random() - 0.5),
        dy: (Math.random() - 0.5)
    }
    this.color = color;
    this.mass = 1;
    this.opacity = 0;
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c.fill();
        c.restore();
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath();
    }
    this.update = arrayCircle => {
        for (var i = 0; i < arrayCircle.length; i++) {
            if (this === arrayCircle[i]) continue;
            if ((getDistance(this.x, arrayCircle[i].x, this.y, arrayCircle[i].y) - this.r * 2) <= 0) {
                resolveCollision(this, arrayCircle[i]);
            }
        }
        if (this.x + this.r >= innerWidth || this.x - this.r <= 0) {
            this.velocity.dx = -this.velocity.dx;
        }
        if (this.y + this.r >= innerHeight || this.y - this.r <= 0) {
            this.velocity.dy = -this.velocity.dy;
        }

        if (getDistance(mouse.x, this.x, mouse.y, this.y) < 120 && this.opacity < 0.5) {
            this.opacity += 0.05;
        } else if (this.opacity > 0) {
            this.opacity -= 0.05
            this.opacity = Math.max(0, this.opacity);
        }
        this.x += this.velocity.dx;
        this.y += this.velocity.dy;
        this.draw();
    }
}

function getDistance(x1, x2, y1, y2) {
    let disX = x1 - x2;
    let disY = y1 - y2;
    return Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2));
}

function getRandomColor(arrayColor) {
    return arrayColor[Math.floor(Math.random() * arrayColor.length)];
}

function init(count) {
    arrayCircle = []
    for (var i = 0; i < count; i++) {
        let r = randomInRange(10, 25);
        let x = randomInRange(r, canvas.width - r);
        let y = randomInRange(r, canvas.height - r);
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        var color = getRandomColor(arrayColor);
        if (i !== 0) {
            let len = arrayCircle.length;
            for (var j = 0; j < len; j++) {
                if ((getDistance(x, arrayCircle[j].x, y, arrayCircle[j].y) - r * 2) < 0) {
                    x = randomInRange(r, canvas.width - r);
                    y = randomInRange(r, canvas.height - r);
                    j = -1;
                }
            }
        }
        arrayCircle.push(new drawCircle(x, y, r, dx, dy, color));
    }
}

function animateCircle() {
    requestAnimationFrame(animateCircle);
    c.clearRect(0, 0, canvas.width, canvas.height);
    // mouseCircle.x = mouse.x;
    // mouseCircle.y = mouse.y;
    // mouseCircle.update();
    // for (var i = 0; i < arrayCircle.length; i++) {
    //     arrayCircle[i].update();
    //     x1 = arrayCircle[i].x;
    //     x2 = mouseCircle.x;
    //     y1 = arrayCircle[i].y;
    //     y2 = mouseCircle.y;
    //     r1 = arrayCircle[i].r;
    //     r2 = mouseCircle.r;
    //     color = arrayRangeCircle[i];
    //     if (getDistance(x1, x2, y1, y2) <= r1 + r2) {
    //         arrayCircle[i].color = 'red';
    //     } else {
    //         arrayCircle[i].color = color;
    //     }
    // }
    arrayCircle.forEach(circle => {
        circle.update(arrayCircle)
    })

}
animateCircle();