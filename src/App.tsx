import UploadPage from './pages/UploadPage';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ResultTable } from './pages/ResultTable';

function App(): JSX.Element {
  const [file, setFile] = useState<File>();

  function handleFile({data}:any){
    setFile(data);
  }

  return (
    <BrowserRouter>
      <Routes>
        {
          //Verificar porque no detecta "file"
        }
        <Route path="/" element={<UploadPage file={file} onFile={handleFile}/>} />
        <Route path="/results" element={<ResultTable file={file}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
