import React, { useState } from 'react';
import { Button, Typography } from '@mui/material'
import UploadOutlinedIcon from '@mui/icons-material/UploadOutlined';
import styled from "@emotion/styled"
import readXlsxFile from 'read-excel-file'
import '@fontsource/roboto/300.css';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type ButtonElement = React.FormEvent<HTMLButtonElement>

const Container = styled.div`
  background: rgba(0, 0, 0, 0) linear-gradient(315deg, rgb(187, 255, 253) 0.01%, rgb(89, 111, 255) 100%) repeat scroll 0% 0%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  color: #fff;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
`

const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

function UploadButton({onChange} :any) {
  return (
    <Button
      variant="contained"
      component="label"
      style={{
        background: 'rgba(0, 0, 0, 0.5)'
      }}
    >
       <UploadOutlinedIcon />
       <input onChange={onChange} type="file" hidden/>
    </Button>
  )
}
  
function App(): JSX.Element {

  const [file, setFile] = useState<File>();
  const [headers, setHeaders] = useState<any>();

  function handleData(event: ChangeEvent){
    event.preventDefault();
    if (event.target.files === null) return
    const myFile = event.target.files[0];
    setFile(event.target.files[0]);
    // Reading file
    readXlsxFile(myFile).then((rows) => {
      //console.log(rows[0])
      //console.log(Object.values(rows[0]))
      if (rows[0] === undefined) return
      setHeaders(rows[0]);
    })
    console.log(headers);
  }

  async function handleSubmit(event: ButtonElement){
    event.preventDefault();
    let formData = new FormData();
    if (file === undefined) return;
    formData.append('file', file);

    // fetch('http://localhost:3000/upload',{
    //   method: 'POST',
    //   body: formData
    // }).then(
    //   response => response.json()
    // ).then(
    //   success => console.log(success.data)
    // ).catch(
    //   error => console.log(error)
    // )
  }

  let headerTag = null;

  if (headers != null){
    headerTag = <div>{headers.map((head :any) => <p>{head}</p>)}</div>
  } else {
    headerTag = <div>Por favor subir el excel</div> 
  }

  return (
    <Container>
      <TitleContainer>
        <Typography variant="h2" sx={{fontWeight: '600'}}>CRACK THE CODE</Typography>
        <Typography variant="h5">Massive Upload Platform</Typography>
      </TitleContainer>
      {headerTag}
      <UploadForm>
        <UploadButton onChange={(event: ChangeEvent) => handleData(event)} />
        {/* <input onChange={(event: ChangeEvent) => handleData(event)} type="file"/> */}
        <Button
          onClick={(event: ButtonElement) => handleSubmit(event)}
          sx={{
            padding: '5px 15px',
            backgroundColor: '#fff',
            color: '#000',
            fontFamily: 'Roboto',
            fontSize: '1.1rem'
          }}
        >Next</Button>
      </UploadForm>
    </Container>
  );
}

export default App;
