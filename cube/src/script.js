import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//scene
const scene = new THREE.Scene();

//red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "#f00" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

let cursor = {
  x: 0,
  y: 0,
};
//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//camera
let fieldOfView = 75,
  aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, 0.1, 100);
camera.position.z = 6;
scene.add(camera);

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

const clock = new THREE.Clock();
const controls = new OrbitControls(camera, canvas);
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //   mesh.position.y = Math.sin(elapsedTime);
  //   mesh.position.x = Math.cos(elapsedTime);
  //   mesh.rotation.y = Math.sin(elapsedTime);
  //   mesh.rotation.x = Math.cos(elapsedTime);

  camera.position.x = Math.sin(cursor.x * Math.PI) * 5; //cursor.x * 10;
  camera.position.z = Math.cos(cursor.x * Math.PI) * 5; // cursor.y * 10;
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

tick();

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
});
window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
window.addEventListener("dblclick", (event) => {
  if (!document.fullscreenElement) {
    //enter fullscreen
  } else {
    //leave fullscreen
  }
});
