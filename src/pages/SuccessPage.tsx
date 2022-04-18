import { Container } from "../components/styled-components";
import Text from "../components/Text";
import ReturnButton from "../components/ReturnButton";

export default function SuccessPage(){
  
  return (
    <Container>
      <Text>Todos los registros han sido creados satisfactoriamente</Text>
      <ReturnButton/>
    </Container>
  );
}