import { Container } from "../components/styled-components";
import Text from "../components/Text";
import styled from "@emotion/styled";

export default function ResultsPage(){
  
  const data = JSON.parse(localStorage.getItem("DataFromAPI") || "");
  console.log(data.data.data_to_inspect);

  const DataContainer= styled.div`
    display:flex;
    flex-direction: column;
    justify-content: flex-start;
  `

  return (
    <Container>
      <DataContainer>
        <Text>Registros creados: {data.data.registers_created}</Text>
        <Text>Registros con errores: {data.data.registers_with_errors}</Text>
        <Text>Total de data analizada: {data.data.total_data_analized}</Text>
      </DataContainer>
    </Container>
  )
}