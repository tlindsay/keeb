import React, { useContext } from 'react';
import { MidiContext } from './MidiController';

export default function ThreeComponent(props) {
  const { keys, pitchBend } = useContext(MidiContext);
  return (
    <div>
      <h2>Bend: {pitchBend}</h2>
      <h2>Keys:</h2>
      <ul>
        {keys.map(key => <li>{key.note.number}</li>)}
      </ul>
    </div>
  );
}
