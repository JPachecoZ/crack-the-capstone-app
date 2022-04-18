import { Button } from "@mui/material"

export default function SubmitButton({onSubmit, isDisabled}: any){
  type ButtonElement = React.FormEvent<HTMLButtonElement>

  return(
    
    <Button
    onClick={(event: ButtonElement) => onSubmit(event)}
    sx={{
      padding: '5px 15px',
      backgroundColor: '#fff',
      color: '#000',
      fontFamily: 'Roboto',
      fontSize: '1.1rem'
    }}
    disabled={isDisabled}
    >Next</Button>
  )
}