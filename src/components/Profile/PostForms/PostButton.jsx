import { Button } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
    button:{
        position:"absolute",
        right:"1rem",
        top:"0rem",
        fontWeight:"bold",
        padding:"0.5rem 1rem",
        borderRadius:"20px",
    }
})

export default function PostButton({status}){
    const styles = useStyles() 

    return(
        <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        className={styles.button}
        disabled={status}
        >
            Post
        </Button>
    )
}