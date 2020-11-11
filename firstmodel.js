import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {MMDLoader} from 'three/examples/jsm/loaders/MMDLoader';
window.speed = 0.01;

// threejs 三要素: scene, camera, renderer
const scene = new THREE.Scene();
// 参数说明 
// FOV, field of view 可视角度 degree
// aspect radio, 可视区域宽高比
// near clipping plane 最近可渲染距离
// far clipping plane 最远可渲染距离
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 5000 );// 透视摄像头
// 根据选择的渲染器的不同, three会为你创建适合的展示元素和上下文, 这里应该是创建了一个canvas, 并为它搞了个webgl的context
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);// canvas的height和width属性设置
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;

document.body.appendChild(renderer.domElement);// 把创建的渲染器展示元素(这里就是canvas)加入dom tree
/* 现在舞台搭建完毕, 开始表演 */

// 放个蓝盒子
const geometry = new THREE.BoxGeometry(); // 形状
const material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // 材质
const cube = new THREE.Mesh(geometry, material); // 形状 + 材质 = 物体
// scene.add(cube);

// 一条直线
const blueMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});
const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(0, 10, 0),
    new THREE.Vector3(10, 0, 0),
]);
const line = new THREE.Line(lineGeometry, blueMaterial);
// scene.add(line);

// 加载弗拉明戈模型
const loader = new GLTFLoader();
let mixer = {};// 不知道为什么不起效
loader.load('./models/Flamingo.glb', function(gltf) {
    const mesh = gltf.scene.children[0];
    mesh.position.y = 5;
    mesh.rotation.y = - 1;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    // scene.add(mesh);

    mixer = new THREE.AnimationMixer( mesh );
    // so clipaction method here return an AnimationAction instance
    mixer.clipAction( gltf.animations[ 0 ] ).setDuration( 5 ).play();
    mixers.push( mixer );
});

// 加载白色长颈鹿模型
const fbxLoader = new FBXLoader();
let giraffeMixer = {};
fbxLoader.load('./models/Giraffe_0.fbx', (fbx)=>{
    fbx.position.z = -60;
    fbx.scale.x = .4;
    fbx.scale.z = .4;
    fbx.scale.y = .4;
    fbx.rotation.y = -100;
    giraffeMixer = new THREE.AnimationMixer(fbx);
    // clipAction return AnimationAction
    giraffeMixer.clipAction(fbx.animations[0]).setDuration(5).play();

    // scene.add(fbx);
});

// 加载草地模型
fbxLoader.load('./models/Ground1.fbx', (fbx)=>{
    fbx.position.z = -6;
    fbx.position.x = -200;
    fbx.scale.x = 20;
    fbx.scale.y = 20;
    fbx.scale.z = 20;
    // fbx.scale.x = .4;
    // fbx.scale.z = .4;
    // fbx.scale.y = .4;
    // giraffeMixer = new THREE.AnimationMixer(fbx);
    // clipAction return AnimationAction
    // giraffeMixer.clipAction(fbx.animations[0]).setDuration(1).play();

    // scene.add(fbx);
});
// 加载ac娘模型
const mmdloader = new MMDLoader();
mmdloader.load("./models/ac/ac1.03.pmx", (mesh)=>{
    mesh.scale.x = 10;
    mesh.scale.y = 10;
    mesh.scale.z = 10;
    
    scene.add(mesh);
});
// 光线
const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.6 );
hemiLight.color.setHSL( 0.6, 1, 0.6 );
hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
hemiLight.position.set( 0, 50, 0 );
scene.add( hemiLight );

const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
// scene.add( hemiLightHelper );


const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.color.setHSL( 0.1, 1, 0.95 );
dirLight.position.set( - 1, 1.75, 1 );
dirLight.position.multiplyScalar( 30 );
scene.add( dirLight );

dirLight.castShadow = true;

dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;

const d = 50;

dirLight.shadow.camera.left = - d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = - d;

dirLight.shadow.camera.far = 3500;
dirLight.shadow.bias = - 0.0001;
const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
// scene.add( dirLightHelper );

camera.position.z = 250;

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += .01;
    cube.rotation.y += .01;
    // window.mixer=mixer;
    mixer.update && mixer.update(10.01);
    giraffeMixer.update && giraffeMixer.update(window.speed);
    renderer.render( scene, camera );
}
animate();
