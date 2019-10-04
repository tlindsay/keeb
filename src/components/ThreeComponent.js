import React, { useContext, useEffect } from 'react';
import * as THREE from 'three';
import { MidiContext } from './MidiController';
import { ThreeContext } from './ThreeContext';

export default function ThreeComponent(props) {
  const { keys, pitchBend } = useContext(MidiContext);
  const { cameraRef, canvasRef, rendererRef, sceneRef } = useContext(ThreeContext);

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.add(new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()
      ));

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }

    window.THREE = THREE;
  });

  return (<div>hello</div>);
}
