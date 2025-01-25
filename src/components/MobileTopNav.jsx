import React, { useContext, useState } from 'react'
import ProfileImage from './Profile/ProfileImage'
import { useNavigate } from 'react-router-dom'
import { FaXTwitter } from 'react-icons/fa6'
import { IconButton } from '@mui/material'
import { AuthContext } from '../contexts/AuthContext'
import PopoverLayout from './Profile/PopoverLayout'
import { FiLogOut } from 'react-icons/fi'

const MobileTopNav = () => {
    const {user,logOut} = useContext(AuthContext)
    const navigate = useNavigate()
    const [anchorEl,setAnchorEl] = useState(null)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <IconButton onClick={()=>{navigate('/home')}}>
                <FaXTwitter/>
            </IconButton>
            <div 
            onClick={handleClick}
            style={{position:"absolute",left:"1rem",cursor:"pointer"}}>

                <ProfileImage image_url={user?.profile_image_url} size='30px'/>
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

export default MobileTopNav