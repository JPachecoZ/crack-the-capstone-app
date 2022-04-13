import { findByLabelText } from '@testing-library/react';
import React, { useState } from 'react';

function App(): JSX.Element {

  const [file, setFile] = useState<File>();

  type ChangeEvent = React.ChangeEvent<HTMLInputElement>
  type ButtonElement = React.FormEvent<HTMLButtonElement>

  function handleData(event: ChangeEvent){
    event.preventDefault();
    if (event.target.files === null) return
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event: ButtonElement){
    event.preventDefault();
    let formData = new FormData();
    if (file === undefined) return;
    formData.append('file', file);

    fetch('http://localhost:3000/upload',{
      method: 'POST',
      body: formData
    }).then(
      response => response.json()
    ).then(
      success => console.log(success.data)
    ).catch(
      error => console.log(error)
    )
  }

  const ContainerStyle = {
    backgroundColor: "#333333",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white"
  }

  return (
    <div style={ContainerStyle}>
      <form>
        <input onChange={(event: ChangeEvent) => handleData(event)} type="file"/>
        <button onClick={(event: ButtonElement) => handleSubmit(event)}>Send Files</button>
      </form>
    </div>
  );
}

export default App;
