import { Typography } from "@mui/material"
import { CommonContainer } from "./styled-components"

export default function Header(){
  return (
    <CommonContainer style={{height: "40vh", marginBottom: "50px", justifyContent: "flex-end"}}>
      <Typography variant="h2" sx={{fontWeight: '600'}}>CRACK THE CODE</Typography>
      <Typography variant="h5">Massive Upload Platform</Typography>
    </CommonContainer>
  )
}
