const wallColor = 0xd5dbd5;
const floorColor = 0xa83232;
const roofColor = 0xd5dbd5;

//Scena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Dodavanje kamere u scenu
scene.add(camera);
camera.position.z = 5;
camera.position.y = 1;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
document.body.appendChild(renderer.domElement);
const playerRadius = 0.25;
const playerSphere = new THREE.Sphere();

// Ambijentna svjetlost
let ambientLight = new THREE.AmbientLight(0x404040, 1);
ambientLight.position.x = camera.position.x;
ambientLight.position.y = camera.position.y;
ambientLight.position.z = camera.position.z;
scene.add(ambientLight);

// Sunce
let sunLight = new THREE.DirectionalLight(0xffffff, 1);
sunLight.position.set(10, 10, 10);
scene.add(sunLight);

//Kocka
let cube1Geometry = new THREE.BoxGeometry(1, 1, 1);
let cube1Material = new THREE.MeshStandardMaterial({ color: 0x01ffff });
let cube1 = new THREE.Mesh(cube1Geometry, cube1Material);
cube1.position.set(0, 1, 0);
let showingCube1 = false;
let showingCube2 = false;
let showingCube3 = false;

//Kocka2
let cube2Geometry = new THREE.BoxGeometry(1, 1, 1);
let cube2Material = new THREE.MeshStandardMaterial({ color: 0x21bca11 });
let cube2 = new THREE.Mesh(cube2Geometry, cube2Material);
cube2.position.set(0, 1, 0);

//Kocka3
let cube3Geometry = new THREE.BoxGeometry(1, 1, 1);
let cube3Material = new THREE.MeshStandardMaterial({ color: 0xfdff011 });
let cube3 = new THREE.Mesh(cube3Geometry, cube3Material);
cube3.position.set(0, 1, 0);

// Podloga
let floorGeometry = new THREE.PlaneGeometry(20, 20);
let floorMaterial = new THREE.MeshStandardMaterial({
  color: floorColor,
});
let floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Zidovi
const wallGroup = new THREE.Group();
scene.add(wallGroup);

// Zid
let wallGeometry = new THREE.BoxGeometry(20, 4, 0.1);
let wallMaterial = new THREE.MeshStandardMaterial({
  color: wallColor, // smeđa boja
});

// Lijevi zid
let leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.set(-10, 2, 0);
// Desni zid
let rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.rotation.y = Math.PI / 2;
rightWall.position.set(10, 2, 0);
// Prednji zid
let frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
frontWall.position.set(0, 2, -10);
// Stražnji zid
let backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, 2, 10);
wallGroup.add(leftWall, rightWall, frontWall, backWall);

// bounding box
for (let i = 0; i < wallGroup.children.length; i++) {
  wallGroup.children[i].BBox = new THREE.Box3();
  wallGroup.children[i].BBox.setFromObject(wallGroup.children[i]);
}

const roofGeometry = new THREE.PlaneGeometry(20, 20);
const roofMaterial = new THREE.MeshStandardMaterial({
  color: roofColor,
});
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.rotation.x = Math.PI / 2;
roof.position.y = 4; // Postavljanje krova malo iznad zidova

// Pomicanje kamere
document.addEventListener("keydown", moveCamera, false);
function moveCamera(event) {
  switch (event.keyCode) {
    case 37: // strelica lijevo
      camera.position.x -= 0.1;
      break;
    case 39: // strelica desno
      camera.position.x += 0.1;
      break;
    case 38: // strelica gore
      camera.position.z -= 0.1;
      break;
    case 40: // strelica dolje
      camera.position.z += 0.1;
      break;
    case 87: // W
      camera.position.z -= 0.1;
      break;
    case 65: // A
      camera.position.x -= 0.1;
      break;
    case 83: // S
      camera.position.z += 0.1;
      break;
    case 68: // D
      camera.position.x += 0.1;
      break;
    /*case 32: // razmak
      camera.position.y += 0.1;
      break;*/
    default:
      break;
  }
}

document.getElementById("object-selection-1").addEventListener("click", () => {
  showingCube1 = true;
  if (showingCube1) {
    scene.add(cube1);
    scene.remove(cube2);
    scene.remove(cube3);
  }

  showingCube2 = false;
  showingCube3 = false;
});
document.getElementById("object-selection-2").addEventListener("click", () => {
  showingCube2 = true;
  if (showingCube2) {
    scene.add(cube2);
    scene.remove(cube1);
    scene.remove(cube3);
  }
  showingCube1 = false;

  showingCube3 = false;
});
document.getElementById("object-selection-3").addEventListener("click", () => {
  showingCube3 = true;
  if (showingCube3) {
    scene.add(cube3);
    scene.remove(cube1);
    scene.remove(cube2);
  }
  showingCube1 = false;
  showingCube2 = false;
});

// Promjena veličine prozora
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Rotacija i renderiranje
let render = function () {
  requestAnimationFrame(render);
  cube1.rotation.y += -0.002;
  cube1.rotation.x += -0.002;
  cube2.rotation.y += -0.002;
  cube2.rotation.x += -0.002;
  cube3.rotation.y += -0.002;
  cube3.rotation.x += -0.002;
  renderer.render(scene, camera);
};
render();
