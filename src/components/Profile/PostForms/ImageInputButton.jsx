import { IconButton, Tooltip } from "@mui/material";
import { FaRegImage } from "react-icons/fa6";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    input:{
        display:"none"
    },
    icon:{
        color:"rgb(120, 86, 255)"
    }
})

export default function ImageInputButton({fileInputRef,handleImageChange,handleIconClick}){
    const styles = useStyles()
    
    return(
        <Tooltip title="Media" className="d-flex align-items-center">

            <IconButton onClick={handleIconClick} >
            <input type="file" ref={fileInputRef} className={styles.input} onChange={handleImageChange} />
            <FaRegImage type='file' className={styles.icon} />
            </IconButton>
        </Tooltip>
    )
}