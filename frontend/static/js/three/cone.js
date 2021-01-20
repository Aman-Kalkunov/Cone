import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';

const elementHTML = document.querySelector('#app'); // Получаем елемент с данными от сервера
const points = JSON.parse(elementHTML.dataset.points);

createCone(points);

// Функция принимает массив объектов точек.
// Первая точка координаты вершины Конуса.
function createCone(array) {
  const position = array[0].z;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, position * 5);

  camera.position.x = -position;
  camera.position.y = -position;
  camera.position.z = position;

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const material = new THREE.MeshBasicMaterial({
    color: 0x76c0eb,
    wireframe: true,
  });

  // цикл для получения координат точек треугольников 
  for (let i = 1; i <= array.length - 1; i++) {

    // последний треугольник сходится с первым
    if (i === array.length - 1) {
      const geometry = new THREE.Geometry();

      geometry.vertices.push(
        new THREE.Vector3(array[0].x, array[0].y, array[0].z),
        new THREE.Vector3(array[i].x, array[i].y, array[i].z),
        new THREE.Vector3(array[1].x, array[1].y, array[1].z)
      );

      geometry.faces.push(new THREE.Face3(0, 1, 2));
      const cone = new THREE.Mesh(geometry, material);
      scene.add(cone);
    } else {
      const geometry = new THREE.Geometry();

      geometry.vertices.push(
        new THREE.Vector3(array[0].x, array[0].y, array[0].z),
        new THREE.Vector3(array[i].x, array[i].y, array[i].z),
        new THREE.Vector3(array[i + 1].x, array[i + 1].y, array[i + 1].z)
      );

      geometry.faces.push(new THREE.Face3(0, 1, 2));
      const cone = new THREE.Mesh(geometry, material);
      scene.add(cone);
    }
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
  }, false);

  const stats = Stats();
  document.body.appendChild(stats.dom);

  const animate = function () {
    requestAnimationFrame(animate);
    scene.rotation.x += 0.00;
    scene.rotation.y += 0.00;
    scene.rotation.z += 0.01;
    controls.update();
    render();
    stats.update();
  };

  function render() {
    renderer.render(scene, camera);
  }

  animate();
}