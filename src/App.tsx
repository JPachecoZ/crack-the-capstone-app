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
const HeadersContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`
const HeadBox = styled.div`
  padding: 3px 5px;
  border-radius: 8px;
  background-color: #fff;
  color: #000;
  font-size: 0.85rem;
  font-weight: 600;
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
  const [dataErrors, setDataErrors] = useState<string[]>([]);
  //const [isDisable, setIsDisable] = useState<boolean>(false);
  //const [isCorrect, setIsCorrect] = useState<boolean>(false);

  function handleData(event: ChangeEvent){
    event.preventDefault();
    if (event.target.files === null) return
    const myFile = event.target.files[0];
    setFile(event.target.files[0]);
    // Reading file
    readXlsxFile(myFile).then((rows) => {
      if (rows[1] === undefined) return
      setHeaders(rows[1]);
    })
    console.log(headers);
    console.log(headers);
  }

  async function handleSubmit(event: ButtonElement){
    event.preventDefault();
    let formData = new FormData();
    if (file === undefined) return;
    formData.append('file', file);

    //fetch('http://localhost:3000/upload',{ //Este puerto es de ustedes, el mio es el de abajo
    fetch('http://127.0.0.1:5500/upload',{
      method: 'POST',
      body: formData
    }).then(
      response => response.json()
    ).then(
      success => {
        setDataErrors(success.data) 
        //console.log(success.data.data_to_inspect)
      }
    ).catch(
      error => console.log(error)
    )
  }

  // Se muestran los headers
  let headerTag = <div>Por favor subir el excel</div>;
    
  if (headers != null){
    if (headers.length === 21){
      headerTag = (
        <div style={{display: 'flex', gap: '8px', flexDirection: 'column'}}>
          <Typography variant="body1" textAlign="center">
            Se exportarán las siguientes columnas
          </Typography>
          <HeadersContainer>
            {headers.map((head :any) => <HeadBox>{head}</HeadBox>)}
          </HeadersContainer>
          <Typography variant="body1" textAlign="center">
            Cantidad de errores:
          </Typography>
          
        
        </div>
      
)    } else {
      headerTag = <div>El número de columnas no es la correcta</div>
    }
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
