// Sidebar.js
import React, { useContext, useEffect, useState } from 'react';
import { Grid2 } from '@mui/material';

import { GoBookmark, GoBookmarkFill, GoHome,GoHomeFill } from "react-icons/go";
import { FaXTwitter} from "react-icons/fa6";
import { IoPersonOutline, IoPersonSharp, IoSearchOutline,IoSearchSharp } from "react-icons/io5";
import { BsGear,BsGearFill } from "react-icons/bs";
import { createUseStyles } from 'react-jss';
import Item from './Item';
import PostButton from './PostButton';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from '@emotion/react';
import AccountSection from './AccountSection';
import { AuthContext } from '../../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';

const useStyles = createUseStyles((theme)=>({
  list:{
    height:"100vh",
    margin:"0px",
    position:"fixed",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    marginLeft:"0rem", 

    
    '@media (max-width: 600px)': {
      maxHeight:"7.5vh",
      marginLeft:"0rem", 
      borderTop:`1px solid ${theme?.palette?.divider}`,
      position:"relative",
      backgroundColor:theme?.palette?.background?.default,

    }
  },
  listContainer:{
    width:"80%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    '@media (max-width:600px)':{
      width:"100%",
      height:"100%",
      justifyContent:"space-around",
      flexDirection:"row"
    }
  },
  icon:{
    fontSize: '2rem', 
    color: theme?.palette?.color?.default,
    width: '100%',

    '@media (max-width: 600px)': {
      fontSize: '1.5rem',
    }
  },
}))


const Sidebar = () => {

  const isNotMobile = useMediaQuery({ query: '(min-width: 600px)' })
  const [listIndex,setListIndex] = useState(0)
  const theme = useTheme()
  const styles = useStyles({theme})
  const {user} = useContext(AuthContext)
  const titles = ["/home","/explore",`/savedPosts`,`/user/${user?.id}`,"/settings"]
  const location = useLocation()

  useEffect(()=>{
    const titlesIndex = titles.indexOf(location.pathname) + (isNotMobile ? 1 : 0)
    setListIndex(titlesIndex)
    window.scrollTo(0,0)
  },[user?.id,location.pathname,isNotMobile])

  const withIconClass = (IconComponent) => <IconComponent className={styles.icon} />;

  const items = [
      {title: "", icon: withIconClass(FaXTwitter), iconSelected: withIconClass(FaXTwitter) },
      { title: "Home", icon: withIconClass(GoHome), iconSelected: withIconClass(GoHomeFill) },
      { title: "Explore", icon: withIconClass(IoSearchOutline), iconSelected: withIconClass(IoSearchSharp) },
      { title: "Bookmark", icon: withIconClass(GoBookmark), iconSelected: withIconClass(GoBookmarkFill) },
      { title: "Profile", icon: withIconClass(IoPersonOutline), iconSelected: withIconClass(IoPersonSharp) },
      { title: "Settings", icon: withIconClass(BsGear), iconSelected: withIconClass(BsGearFill) },
  ]
  const listItems = isNotMobile ? items : items.slice(1)

  return (
    <Grid2 size={{xs:12,sm:2,md:1.5,lg:2.5}} className={styles.list}>

      <Grid2 className={styles.listContainer}  sx={{alignItems:{sm:"center",lg:"baseline"}}}>


      {listItems.map((i,index)=>{
        return (
          <Item 
          key={index}
          item={i} 
          index={index}
          listIndex={listIndex}
          setListIndex={setListIndex}
          />)
        })}
      
      {isNotMobile && <PostButton/>}
      <AccountSection/>
      </Grid2>
    </Grid2>

  );
};

export default Sidebar;