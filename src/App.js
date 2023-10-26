import './App.css';

import React, { useState } from 'react';

import MindARThreeViewer from './mindar-three-viewer';
import MindARViewer from './mindar-viewer';

function App() {
  const [started, setStarted] = useState(null);

  return (
    <div className="App">
      <h1>Nod N Win Game </h1>

      <div className="control-buttons">
        {started === null && <button onClick={() => {setStarted('aframe')}}>Click to Play</button>}
        {/* {started === null && <button onClick={() => {setStarted('three')}}>Start ThreeJS version</button>} */}
        {started !== null && <button onClick={() => {setStarted(null)}}>Stop</button>}
      </div>

      {started === 'aframe' && (
        <div className="container">
          <MindARViewer/>
          <video></video>
        </div>
      )}

      {/* {started === 'three' && (
        <div className="container">
          <MindARThreeViewer />
        </div>
      )} */}
    </div>
  );
}

export default App;
