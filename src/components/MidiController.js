import React, { useCallback, useEffect, useReducer, useState } from 'react';
import * as Midi from 'webmidi';
import _ from 'lodash';

export const MidiContext = React.createContext();

export default function MidiController(props) {
  const [ keys, setKeys ] = useReducer(keyReducer, []);
  const [ pitchBend, setPitchBend ] = useState(0);
  const [ midiInput, setMidiInput ] = useState(null);

  // Define key modifiers
  function keyReducer(state, action) {
    switch(action.type) {
      case 'keyDown':
        let { data, note, velocity } = action.event;
        return [...state, { data, note, velocity }];
      case 'keyUp':
        let { note: { number } } = action.event;
        return _.reject(state, ['note.number', number]);
      default:
        throw new Error();
    }
  }

  // Define pitchBend modifier
  const bendPitch = useCallback(({ value }) => {
    setPitchBend(value);
  }, []);

  // Init MIDI library
  useEffect(() => {
    Midi.enable((err) => {
      if (err) {
        throw err;
      } else {
        console.info('Setting MIDI input');
        setMidiInput(Midi.inputs[0]);
      }
    });
  }, []);

  // Bind event handlers
  useEffect(() => {
    if (!midiInput) {
      let isScrolling;
      document.addEventListener('keydown', ({ keyCode }) => {
        let data = [keyCode, keyCode, keyCode];
        let note = { number: keyCode };
        let velocity = 100;
        setKeys({ type: 'keyDown', event: { data, note, velocity } });
      });
      document.addEventListener('keyup', ({ keyCode }) => {
        let note = { number: keyCode };
        setKeys({ type: 'keyUp', event: { note } });
      });
      document.addEventListener('scroll', (e) => {
        e.preventDefault();
        let value = document.documentElement.scrollTop / 35.0;
        bendPitch({ value });
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => bendPitch({ value: 0 }));
      });
      return;
    }

    midiInput.addListener('noteon', 'all', (event) => setKeys({ type: 'keyDown', event }));
    midiInput.addListener('noteoff', 'all', (event) => setKeys({ type: 'keyUp', event }));
    midiInput.addListener('pitchbend', 'all', bendPitch);

    return function cleanup() {
      midiInput.removeListener();
    }
  }, [midiInput, bendPitch]);

  return (
    <MidiContext.Provider value={{ keys, pitchBend }}>
      <figcaption>Bend: {pitchBend} Keys: {keys.length}</figcaption>
      {props.children}
    </MidiContext.Provider>
  );
}
