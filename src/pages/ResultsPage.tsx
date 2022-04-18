import { Container } from "../components/styled-components";
import Text from "../components/Text";
import styled from "@emotion/styled";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

export default function ResultsPage(){
  const [page, setPage] = useState(0);
  const data = JSON.parse(localStorage.getItem("DataFromAPI") || "");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const DataContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  `;

  return (
    <Container>
      <DataContainer>
        <Text>Registros creados: {data.data.registers_created}</Text>
        <Text>Registros con errores: {data.data.registers_with_errors}</Text>
        <Text>Total de data analizada: {data.data.total_data_analized}</Text>
      </DataContainer>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">First Name</TableCell>
                <TableCell align="center">Last Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">IP Country</TableCell>
                <TableCell align="center">Tipo de Documento</TableCell>
                <TableCell align="center">N° de Documento</TableCell>
                <TableCell align="center">Nombre de Estudiante</TableCell>
                <TableCell align="center">Apellido de Estudiante</TableCell>
                <TableCell align="center">
                  Fecha de Nac. de Estudiante
                </TableCell>
                <TableCell align="center">Curso</TableCell>
                <TableCell align="center">Group ID</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(data.data.data_to_inspect).map((item: any) => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell align="center">{item[0]}</TableCell>
                  <TableCell align="center">{item[1]}</TableCell>
                  <TableCell align="center">{item[3]}</TableCell>
                  <TableCell align="center">{item[4]}</TableCell>
                  <TableCell align="center">{item[5]}</TableCell>
                  <TableCell align="center">{item[6]}</TableCell>
                  <TableCell align="center">{item[7]}</TableCell>
                  <TableCell align="center">{item[8]}</TableCell>
                  <TableCell align="center">{item[10]}</TableCell>
                  <TableCell align="center">{item[16]}</TableCell>
                  <TableCell align="center">{item[20]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={Object.keys(data.data.data_to_inspect).length}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Container>
  );
}