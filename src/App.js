import React from 'react';

import MidiController from './components/MidiController';
import ThreeComponent from './components/ThreeComponent';
import './App.scss';

function App() {
  return (
    <div className="App">
      <h1>KEEEEEEEEEEB</h1>
      <MidiController>
        <ThreeComponent />
      </MidiController>
    </div>
  );
}

export default App;
