import { HeadersContainer, HeadBox } from "./styled-components";
import { Typography } from "@mui/material";
import { usual_headers } from "../config/ConfigData";
import styled from "@emotion/styled";

export default function RenderedHeaders({headers}: any){

  const Container = styled.div`
    display: flex;
    gap: 24px;
    flex-direction: row;
  `

  return(
    <Container>
      <HeadersContainer>
      <Typography variant="body1" textAlign="center" marginBottom="8px">
        Columnas a exportar:
      </Typography>
        {Object.keys(headers).map((head :any) => {
          if (headers[head] !== null) {
            let name = Object.keys(usual_headers).find(key => usual_headers[key] === head);
            return <HeadBox key={name}>{name}</HeadBox>
          }
          return ""
          })}
      </HeadersContainer>

      <HeadersContainer>
      <Typography variant="body1" textAlign="center" marginBottom="8px">
        Columnas no encontradas:
      </Typography>
        {Object.keys(headers).map((head :any) => {

          if (headers[head] === null) {
            let name = Object.keys(usual_headers).find(key => usual_headers[key] === head);
            return <HeadBox key={name}>{name}</HeadBox>
          }
          return ""
          })}
      </HeadersContainer>
    </Container>
  )
}

