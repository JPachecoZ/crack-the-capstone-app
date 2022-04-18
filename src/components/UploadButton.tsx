import { Button } from "@mui/material"
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined"

export default function UploadButton({onChange} :any) {
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
