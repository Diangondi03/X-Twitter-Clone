import { ListItem, ListItemIcon } from "@mui/material"
import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { useTheme } from "@emotion/react"
import { createUseStyles } from "react-jss"


const useStyles = createUseStyles((theme)=>({
  item:{
    cursor:"pointer",
    borderRadius:"20px",
    padding:"0",
    width:"fit-content",
    '@media (max-width: 1200px)': {
      display:"flex",
    },


  },
  div:{
    display:"flex",
    alignItems:"center",
    padding:"0.5rem",
    borderRadius:"30px",
    '&:hover': {

      backgroundColor: theme?.palette?.background?.hoverSidebar,
  }
  }
}))

export default function Item({item,index,listIndex,setListIndex}){

    const theme = useTheme()
    const styles = useStyles({theme})
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()
    
    const getLink = (title) => {
        switch(title){
          case "Home":
            return "/home"
          case "Explore":
            return "/explore"
          case "Messages":
            return "/messages"
          case "Bookmark":
            return "/savedPosts"
          case "Profile":
            return `/user/${user?.id}`
          case "Settings":
            return "/settings"
          default:
            return "/home"
      }
    }

    return(
        <ListItem
        onClick={()=>{
          setListIndex(index)
          navigate(getLink(item.title))
        }}
        className={styles.item}
        >
          <div 
          className={styles.div}
          style={item.title=="" ? {width:"4.5rem"} : {}}

          >

          <ListItemIcon>
            {index===listIndex ? item.iconSelected : item.icon}
          </ListItemIcon>
          <p className='d-none d-xl-block'  style={{fontSize:"20px",margin:"0",padding:"5px",fontWeight:index===listIndex ? "700" : "400"}}>{item.title}</p>
          </div>
        </ListItem>

      )
}