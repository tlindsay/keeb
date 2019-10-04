import React, { createContext, createRef, useEffect } from 'react';
import * as THREE from 'three';

export const ThreeContext = createContext();

export default function ThreeCanvas(props) {
  const cameraRef = createRef();
  const canvasRef = createRef();
  const rendererRef = createRef();
  const sceneRef = createRef();

  // Bootstrap THREE Scene
  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas.getContext('webgl');
    let { clientHeight, clientWidth } = canvas;

    let scene = new THREE.Scene();

    let renderer = new THREE.WebGLRenderer({ canvas, context });
    renderer.setClearColor('hsl(0, 0%, 95%)', 1);
    renderer.setSize(clientWidth, clientHeight);

    let camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(new THREE.Vector3());

    scene.add(camera);

    renderer.render(scene, camera);

    cameraRef.current = camera;
    rendererRef.current = renderer;
    sceneRef.current = scene;
    return function cleanup() {
      scene.dispose();
    }
  }, [ cameraRef, canvasRef, rendererRef, sceneRef ]);

  return (
    <ThreeContext.Provider value={{ cameraRef, canvasRef, rendererRef, sceneRef }}>
      <figure>
        <canvas ref={canvasRef} />
        {props.children}
      </figure>
    </ThreeContext.Provider>
  );
}
