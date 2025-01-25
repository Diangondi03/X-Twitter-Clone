import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles((theme) =>({
    container:{
      display:"flex",
      backgroundColor:theme?.palette?.background?.default,
      '@media (max-width: 600px)':{
        flexDirection:"column-reverse !important"
      }
    },
    aside:{
      position:"relative",
      borderRight: `solid 1px ${theme?.palette?.divider}`,


      '@media (max-width: 600px)': {
        position:"fixed",
        bottom:"0",
        left:"0",
        zIndex:"100",
        maxHeight:"7.5vh",
        
      }
    },
    main:{

      '@media (max-width: 600px)': {
        paddingTop:'0rem',
      }
    },
    searchDiv:{
      borderLeft: `solid 1px ${theme?.palette?.divider}`,
      minHeight:"100vh",
    },
    mobileTopDiv:{
      justifyContent:"center",
      alignItems:"center",
      position:"sticky",
      top:"0px",
      height:"40px",
      backgroundColor:theme?.palette?.background?.default
    },
    fixedButton:{
      borderRadius:"50%",
      fontWeight:"bold",
      padding:"1rem",
      
      backgroundColor:"rgb(29, 161, 242)",
      textTransform:"capitalize",
      fontSize:"1.3rem",
      position:"fixed",
      bottom:"5rem",
      right:"1rem",
      '&:hover':{
        backgroundColor:"rgb(29, 161, 242)"
      }

  }
  }))