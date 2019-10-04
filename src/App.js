import React from 'react';

import MidiController from './components/MidiController';
import ThreeCanvas from './components/ThreeContext';
import ThreeComponent from './components/ThreeComponent';
import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>KEEEEEEEEEEB</h1>
      <ThreeCanvas>
        <MidiController>
          <ThreeComponent />
        </MidiController>
      </ThreeCanvas>
    </div>
  );
}

export default App;
