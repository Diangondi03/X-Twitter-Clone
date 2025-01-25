import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme)=>({
    container:{
      marginBottom:"1rem",
      position:"relative",
      paddingLeft:"3.5rem",
    },
    input:{
      padding:"0rem",
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'transparent',
        },
        '&:hover fieldset': {
          borderColor: 'transparent', // Border color on hover
        },
        '&.Mui-focused fieldset': {
          borderColor: 'transparent', // Border color when focused
        },
        '& .MuiInputLabel-root': {
          fontSize: '20px', // Change the font size of the label here
        },
        '& .MuiInputBase-input': {
          fontSize: '20px', // Change the font size of the input text here
        },
      }
    },
    imageDiv:{
      position:"relative",
      margin:"1rem"
    },
    deleteImage:{
      position:"absolute",
      top:"1rem",
      right:"2rem",
      fontSize:"2rem",
      cursor:"pointer"
    },
    photo:{
      width:"40px",
      height:"40px",
      backgroundColor:"gray",
      borderRadius:"50%",
      position:"absolute",
      left:"10px",
      top:"25px"
  
    },
    
    
  }))