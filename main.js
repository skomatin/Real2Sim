import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.171.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/controls/OrbitControls.js';
import { PLYLoader } from 'https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/loaders/PLYLoader.js';

// Initialize the 3D point cloud
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 500, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, 500);
document.getElementById('pointcloud-container').appendChild(renderer.domElement);

// Add OrbitControls for interactivity
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enable smooth interaction
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;

const loader = new PLYLoader();
loader.load('house.ply', function (geometry) {
    geometry.computeVertexNormals();

    const material = new THREE.PointsMaterial({ size: 0.005, color: 0x00aaff });
    const pointCloud = new THREE.Points(geometry, material);

    scene.add(pointCloud);
    animate();
});

camera.position.set(0, 0, 5);

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update controls
    renderer.render(scene, camera);
}