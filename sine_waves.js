// const dat = require('dat.gui');
var canvas = document.getElementById('example_canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gui = new dat.GUI();
var c = canvas.getContext('2d');

const wave = {
    y: canvas.height / 2,
    length: 100,
    amplitude: 100,
    frequency: -0.01
}

const color = {
    h: 200,
    s: 50,
    l: 50
}

const bg = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.01
}
const waveFolder = gui.addFolder('wave');
waveFolder.add(wave, 'y', 0, canvas.height);
waveFolder.add(wave, 'length', 50, 300);
waveFolder.add(wave, 'amplitude', -300, 300);
waveFolder.add(wave, 'frequency', -0.01, 1);

const colorWave = gui.addFolder('color');
colorWave.add(color, 'h', 0, 255);
colorWave.add(color, 's', 0, 100);
colorWave.add(color, 'l', 0, 100);

const backgr = gui.addFolder('background');
backgr.add(bg, 'r', 0, 255);
backgr.add(bg, 'g', 0, 255);
backgr.add(bg, 'b', 0, 255);
backgr.add(bg, 'a', 0, 1);

var increase = 0;

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = `rgba(${bg.r},${bg.g},${bg.b},${bg.a})`;
    c.fillRect(0, 0, canvas.width, canvas.height);
    increase += wave.frequency;

    c.beginPath();
    for (var i = 0; i < canvas.width; i++) {
        c.strokeStyle = `hsl(${color.h},${color.s}%,${color.l}%)`;
        c.lineTo(i, wave.y + Math.sin(i / wave.length + increase) * wave.amplitude * Math.sin(increase));
    }
    c.stroke();
    c.closePath();


}
animate();