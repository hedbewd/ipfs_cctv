import React from 'react';
import IpfsUploader from "./IpfsUploader";
import WebcamStreamCapture from "./WebCam";


function App() {
  return (
    <div>
      <WebcamStreamCapture />
      <IpfsUploader />
    </div>
  );
}

export default App;