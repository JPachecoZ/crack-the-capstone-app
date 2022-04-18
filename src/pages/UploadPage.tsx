import { Container, UploadForm } from "../components/styled-components"
import RenderedHeaders from "../components/RenderedHeaders";
import { usual_headers } from "../config/ConfigData";
import UploadButton from "../components/UploadButton";
import { useState } from 'react';
import readXlsxFile from 'read-excel-file'
import SubmitButton from "../components/SubmitButton";
import {useNavigate} from "react-router-dom"

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type ButtonElement = React.FormEvent<HTMLButtonElement>

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const [headers, setHeaders] = useState<any>();

  function handleData(event: ChangeEvent) {
    event.preventDefault();
    if (event.target.files === null) return;
    const myFile = event.target.files[0];
    setFile(myFile);
    // Reading file
    readXlsxFile(myFile).then((rows: any) => {
      if (rows[1] === undefined) return;
      assignData(rows);
    });
  }

  async function handleSubmit(event: ButtonElement) {
    event.preventDefault();
    let formData = new FormData();
    if (file === undefined) return;
    formData.append("file", file);

    fetch("http://localhost:3000/upload", {
      //Este puerto es de ustedes, el mio es el de abajo
      //fetch('https://crackcapstoneapiv1.herokuapp.com/upload',{

      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((success) => {
        localStorage.clear();
        if (success.data.data_to_inspect.length > 0) {
          localStorage.setItem("DataFromAPI", JSON.stringify(success));
          navigate("/results");
        } else {
          navigate("/success");
        }
      })
      .catch((error) => console.log(error));
  }

  function assignData(rows: any) {
    let initial_data: any = {
      first_name: null,
      last_name: null,
      email: null,
      country: null,
      doc_type: null,
      doc_number: null,
      student_first_name: null,
      student_last_name: null,
      birthdate: null,
      course_name: null,
      group_id: null,
    };

    for (let i = 0; i <= rows[1].length - 1; i++) {
      if (usual_headers[rows[1][i]]) {
        initial_data[usual_headers[rows[1][i]]] = i;
      }
    }
    setHeaders(initial_data);
  }

  return (
    <Container>
      {headers ? <RenderedHeaders headers={headers} /> : ""}
      {file ? <p>{file.name}</p> : ""}
      <UploadForm>
        <UploadButton onChange={(event: ChangeEvent) => handleData(event)} />
        {Object.values(headers || {}).some(
          (element: any) => element === null
        ) ? (
          <SubmitButton isDisabled={true} />
        ) : (
          <SubmitButton isDisabled={false} onSubmit={handleSubmit} />
        )}
      </UploadForm>
    </Container>
  );
}
