import React, {useState} from 'react';
import FileUpload from "./FileUpload";
import WebcamStreamCapture from "./WebCam";


function App() {
  const [fileUrl, setFileUrl] = useState("");
  const [ipfsHash, setIpfsHash] = useState("");
  return (
    <div>
      <WebcamStreamCapture />
      <FileUpload setUrl={setFileUrl} setIpfs={setIpfsHash} />
      FileUrl :{" "}
      <a href={fileUrl} target="_blank" rel="noopener noreferrer">
        {fileUrl}
      </a>
    </div>
  );
}

export default App;