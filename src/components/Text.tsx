import styled from "@emotion/styled";

const StyledText = styled.p`
  margin: 0rem;
`

export default function Text({children}: any){
  return(
    <StyledText>{children}</StyledText>
  )
}