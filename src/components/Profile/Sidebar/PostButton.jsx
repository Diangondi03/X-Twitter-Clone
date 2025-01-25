import { Button, IconButton } from "@mui/material";
import { useContext } from "react";
import { IoCreateOutline } from "react-icons/io5";
import { createUseStyles } from "react-jss";
import { useMediaQuery } from "react-responsive";
import { ModalContext } from "../../../contexts/ModalContext";

const useStyles = createUseStyles({
    button:{
        width:"100%",
        borderRadius:"30px",
        fontWeight:"bold",
        padding:"0.7rem 2rem",
        marginTop:"1rem",
        // marginLeft:"1rem",
        textTransform:"capitalize",
        fontSize:"1.1rem",
        "@media (max-width: 1200px)": {
            width:"50%",
            borderRadius:"100%",
            marginLeft:"0",
        }
    }
})

export default function PostButton(){
    const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' })
    const {setPostModalOpen} = useContext(ModalContext)

    const styles = useStyles()

    return(
            <Button 
            type="submit" 
            variant="contained" 
            color={isDesktop ? "primary": "info"} 
            className={styles.button}
            onClick={()=>{
                setPostModalOpen(true)
            }}
            >
            {isDesktop ? 
                "Post":
                <IconButton>
                <IoCreateOutline style={{color:"white"}}/>
                </IconButton>
            }
            </Button>
    )
}