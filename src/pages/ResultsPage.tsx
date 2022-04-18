import { Container } from "../components/styled-components";
import ReturnButton from "../components/ReturnButton";
import Text from "../components/Text";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function ResultsPage(){
  const data = JSON.parse(localStorage.getItem("DataFromAPI") || "");
  
  const size = data.data.data_to_inspect[0].length;
  
  const errors_from_data = data.data.data_to_inspect.map((array: any) => {
    let errorConcat = `${turnString(array[size - 3]) ? `User: ${turnString(array[size - 3])}, ` : ""}${turnString(array[size - 2]) ? `Student: ${turnString(array[size - 2])}, ` : ""}${turnString(array[size - 1]) ? `Enrollment: ${turnString(array[size - 1])}` : ""}`;
    return [...array, errorConcat];
  });
    
  function turnString(error: any) {
    let text = "";
    for (const [key, value] of Object.entries(error)) {
      if (text !== "") {
        text += `, ${key}: ${value}`;
      } else {
        text += `${key}: ${value}`;
      }
    }
    return text;
  }

  const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 5px;
    margin-bottom: 20px;
  `;

  return (
    <Container>
      <DataContainer>
        <Text>Registros creados: {data.data.registers_created}</Text>
        <Text>Registros con errores: {data.data.registers_with_errors}</Text>
        <Text>Total de data analizada: {data.data.total_data_analized}</Text>
      </DataContainer>
      <TableContainer sx={{ width: "500px", maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Numero de Registro</TableCell>
              <TableCell align="center">Errores de Importacion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {errors_from_data.map((error: any, index: any) => (
              <TableRow hover key={index} role="checkbox" tabIndex={-1}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{error[size]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ReturnButton/>
    </Container>
  );
}