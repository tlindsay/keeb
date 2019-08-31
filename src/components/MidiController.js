import React, { useCallback, useEffect, useState } from 'react';
import * as Midi from 'webmidi';
import _ from 'lodash';

export const MidiContext = React.createContext();

export default function MidiController(props) {
  const [ keys, setKeys ] = useState([]);
  const [ pitchBend, setPitchBend ] = useState(0);
  const [ midiInput, setMidiInput ] = useState(null);

  const keyDown = useCallback(({ data, note, velocity }) => {
    setKeys([ ...keys, { data, note, velocity }])
  }, [keys]);

  const keyUp = useCallback(({ note: { number } }) => {
    setKeys(_.reject(keys, ['note.number', number]));
  }, [keys]);

  const bendPitch = useCallback(({ value }) => {
    setPitchBend(value);
  }, []);

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

  useEffect(() => {
    if (!midiInput) { return; }
    midiInput.addListener('noteon', 1, keyDown);
    midiInput.addListener('noteoff', 1, keyUp);
    midiInput.addListener('pitchbend', 1, bendPitch);

    return function cleanup() {
      midiInput.removeListener();
    }
  }, [midiInput, keyDown, keyUp, bendPitch]);

  return (
    <MidiContext.Provider value={{ keys, pitchBend }}>
      {props.children}
    </MidiContext.Provider>
  );
}
