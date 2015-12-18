// StarField by Neil Daftary
// http://codepen.io/neilzo/pen/ZGVWzp

var camera, scene, renderer;
var mouseX = 0;
var mouseY = 0;
var stars = [];

camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 4000);

camera.position.z = 1000;

scene = new THREE.Scene();
scene.add(camera);

renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x04090d, 1);

document.body.appendChild(renderer.domElement);

function randomRange(min, max) {
	return Math.random()*(max-min) + min;
}

var throttle = function(type, name, obj) {
  var obj = obj || window;
  var running = false;
  var func = function() {
    if (running) { return; }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};
throttle("resize", "optimizedResize");

//TODO fix the pause in animation on resize
window.addEventListener('optimizedResize', function(e){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function makeParticles() {
  var segments = 16;
  var rings = 16;
  var radius = 4;
  var material = new THREE.MeshBasicMaterial({color: 0xffffff});
  var geometry = new THREE.SphereGeometry(radius, segments, rings);

  for (var zpos = -3000; zpos < 3000; zpos += 20) {
    var star = new THREE.Mesh(geometry, material);
    star.position.x = randomRange(-3000, 3000);
    star.position.y = randomRange(-3000, 3000);
    star.position.z = zpos;
    star.scale.x = star.scale.y = randomRange(0, 2);
    scene.add(star);
    stars.push(star);
  }
}
makeParticles();

function render() {
  requestAnimationFrame(render);
  for (var i = 0; i < stars.length; i++) {
    var star = stars[i];
    star.position.z += 1.25; // speed
    if (star.position.z > 1000) {
      star.position.z -= 4000;
    }
  }
  renderer.render(scene, camera);
}
render();