import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { createUseStyles } from 'react-jss'
import { useTheme } from '@emotion/react'
import { FiLogOut } from "react-icons/fi";
import { IoIosMore } from 'react-icons/io'
import { useMediaQuery } from 'react-responsive'
import PopoverLayout from '../PopoverLayout'
import ProfileImage from '../ProfileImage';

const useStyles = createUseStyles((theme)=>({
    account:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        padding:"0.5rem",
        position:"absolute",
        bottom:"1rem",
        cursor:"pointer",
        borderRadius:"40px",
        '&:hover': {

            backgroundColor: theme?.palette?.background?.hoverSidebar,
        },
        '@media (max-width: 600px)':{
            display:"none"
        }
    },
    photo:{
        width:"40px",
        height:"40px",
        backgroundColor:"gray",
        borderRadius:"50%",
    
      },
    name:{
        fontSize:"1rem",
        fontWeight:"bold",
        margin:"0"
    },
    username:{
        color:theme.palette.text.secondary,
        margin:"0"
    },
    more:{
        fontSize:"1.5rem",
    }
}))

const AccountSection = () => {
    const {user,logOut} = useContext(AuthContext)
    const theme = useTheme()
    const styles = useStyles({theme})
    const isDesktop = useMediaQuery({ query: '(min-width: 1200px)' })
    const [anchorEl,setAnchorEl] = useState(null)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    const handleClose = (e) => {
        e.stopPropagation();
        setAnchorEl(null);
    };

    if(!user?.id) return null

    return (
        <>
            <div className={styles.account} onClick={handleClick}>
                <ProfileImage image_url={user?.profile_image_url}/>

                {isDesktop &&
                    <>
                    <div className='mx-3 d-flex flex-column justify-content-center'>

                        <p className={styles.name}>{user?.name}</p>
                        <p className={styles.username}>@{user?.username}</p>
                    </div>

                    <IoIosMore className={styles.more}/>
                    </>
                }
            </div>
            <PopoverLayout
            anchorEl={anchorEl}
            handleClose={handleClose}
            buttons={[
                {icon:FiLogOut,action:()=>{logOut()},text:"Log Out"}
            ]}
            />
        </>
    )
}

export default AccountSection