import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// WebGL兼容性检查（WebGL compatibility check）
if (!WebGL.isWebGL2Available()) {
    const warning = WebGL.getWebGL2ErrorMessage();
    document.getElementById('container').appendChild(warning);
}

// [1-1] 场景（scene）
const scene = new THREE.Scene();

// [1-2] 相机（camera）：PerspectiveCamera（透视摄像机）
// 第一个参数是视野角度（FOV），它的单位是角度(与弧度区分开)
// 第二个参数是长宽比（aspect ratio），宽除以高
// 接下来的两个参数是近截面（near）和远截面（far）
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// [1-3] renderer（渲染器）：WebGL 渲染器
// 显示场景的 <canvas> 元素
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// [2-1] 创建一个立方体
// 顶点（vertices）和面（faces）
const geometry = new THREE.BoxGeometry(1, 1, 1);

// [2-2] 材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// [2-3] 网格
const cube = new THREE.Mesh(geometry, material);

// [3-1] 添加到 (0,0,0) 坐标
scene.add(cube);

// [3-2] 移动摄像机
camera.position.z = 5;

// [3-3] 动画
function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

// [1-4] 渲染场景
function render_loop() {
    requestAnimationFrame(render_loop);

    // [3-3] 动画
    animate();

    renderer.render(scene, camera);
}
render_loop();
