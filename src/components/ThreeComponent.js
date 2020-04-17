import React, { useContext, useEffect, useState } from 'react';
import * as THREE from 'three';
import { MidiContext } from './MidiController';
import { ThreeContext } from './ThreeContext';

export default function ThreeComponent(props) {
  const { keys, pitchBend } = useContext(MidiContext);
  const { cameraRef, canvasRef, rendererRef, sceneRef } = useContext(ThreeContext);
  const [ time, setTime ] = useState();

  // useEffect(() => setTime(0), []);

  useEffect(() => {
    if (sceneRef.current) {
      let mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial()
      );
      sceneRef.current.add(mesh);

      let draw = () => {
        mesh.rotateY(time * 0.01);
        setTime(time + 1);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        requestAnimationFrame(draw);
      }

      requestAnimationFrame(draw);
    }

    window.THREE = THREE;
  });

  return (<div>hello</div>);
}
