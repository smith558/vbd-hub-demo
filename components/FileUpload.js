import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material";
import {memo} from "react";

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
  display: 'none'
});

const FileUpload = memo(
  function FileUpload({variant = 'text', accept = null, onChange}) {
    return <>
      <Button component="label" role={undefined} variant={variant} tabIndex={-1} startIcon={<CloudUploadIcon/>}>
        Upload file
        <VisuallyHiddenInput type="file" accept={accept} onChange={onChange}/>
      </Button>
    </>
  });

export default FileUpload;