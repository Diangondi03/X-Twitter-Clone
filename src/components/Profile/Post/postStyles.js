import { createUseStyles } from "react-jss";

export const useStyles = createUseStyles(theme=>({
    photo:{
      width:"40px",
      height:"40px",
      backgroundColor:"gray",
      borderRadius:"50%",
      position:"absolute",
      left:"10px",
  
    },
    name: {
      cursor: "pointer",
      fontWeight:"700",
      '&:hover': {
        textDecoration: "underline"
      }
    },
    username:{
      fontWeight:"400",
      color:"gray",
      marginLeft:"0.5rem"
    },
    point:{
      margin:"0 0.3rem",
      color:"gray",

    },
    date:{
      fontWeight:"light",
      color:"gray",
      marginLeft:"0rem"
    },
    post:{
      backgroundColor: theme?.palette?.background?.default,  
      backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
      boxShadow: `0 0 0 1px ${theme.palette.divider}`,
      paddingLeft:"3rem",
      position:"relative",
      cursor:"pointer",
      borderRadius:"0px",
      borderLeftColor:"transparent",
      borderRightColor:"transparent",
      '&:hover': {
        backgroundColor: theme?.palette?.background?.hoverPost,
      },
    },
    content:{
      fontSize:"15px",
      lineHeight:"20px",
      paddingTop:"10px",
    },
    image:{
      width: "100%",
      maxHeight: "500px", /* Set your desired max height */
      objectFit: 'contain', 
      marginTop: '10px',
      borderRadius:"20px",
      border:"1px solid grey",
      backgroundColor:"black"
    },
    repostIndicator:{
      margin:"5px 0px",
      display:"flex",
      alignItems:"center",
      '&:hover': {
        textDecoration: "underline",
        textDecorationColor:"gray"
      }
    },
    repostIcon:{
      color: "gray",
      fontSize: "13px",
      fontWeight: "700",
      marginLeft: "16px"
    },
    repostText:{
      color: "gray",
      fontSize: "13px",
      fontWeight: "700",
      marginLeft: "5px"  
    },
    repost:{
      marginTop:"10px",
      borderRadius:"20px",
      position:"relative",
      paddingLeft:"3rem",

      boxShadow: `0 0 0 1px ${theme.palette.divider}`,
      backgroundColor: theme?.palette?.background?.default,  
      backgroundImage: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 100%)",
      '&:hover': {
        backgroundColor: theme?.palette?.background?.hoverRepost,
      },
    },
    repost_image:{
      width: 'calc(100% + 5rem)',
      maxHeight: '500px', 
      position: 'relative',
      left: '-4rem',
      objectFit: 'contain',
      backgroundColor: 'black', 
      marginTop: '10px',
    },
    photoDiv:{
      position: 'absolute',
      left: '10px',
    }
  }))