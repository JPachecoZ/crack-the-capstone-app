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

  function handleSubmit(event: ButtonElement){
    event.preventDefault();
    let formData = new FormData();
    if (file ===undefined) return;
    formData.append('file', file);
    console.log("I'm here");
    fetch('http://localhost:3000/upload',{
      method: 'POST',
      body: formData
    }).then(
      response => console.log(response.json())
    ).then(
      success => console.log(success)
    ).catch(
      error => console.log(error)
    )
  }

  return (
    <div style={{backgroundColor: "#333333", height: "100vh", color: "white"}}>
      <form>
        <input onChange={(event: ChangeEvent) => handleData(event)} type="file"/>
        <button onClick={(event: ButtonElement) => handleSubmit(event)}>Send Files</button>
      </form>
    </div>
  );
}

export default App;
