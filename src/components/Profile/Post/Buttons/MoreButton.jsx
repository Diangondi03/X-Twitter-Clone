import { useTheme } from '@emotion/react';
import React, { useContext, useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss';
import { IoIosMore } from 'react-icons/io';
import { IconButton, Tooltip } from '@mui/material';
import { MdOutlinePersonAddAlt ,MdOutlinePersonRemove} from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import PopoverLayout from '../../PopoverLayout';
import { AuthContext } from '../../../../contexts/AuthContext';
import { FaEdit } from "react-icons/fa";
import { useUserPost } from '../../../../hooks/useUserPost';
import { ModalContext } from '../../../../contexts/ModalContext';
import { useFollow } from '../../../../hooks/useFollow';
import { usePost } from '../../../../hooks/usePost';


const useStyles = createUseStyles((theme)=>(
    {
      button:{
  
        color: theme.palette.color.default,
        padding: '0.7rem',
        textTransform: 'capitalize',	
        fontSize: '1rem',
        fontWeight: '700',
        backgroundColor: theme.palette.background.default,
        borderRadius: '0px',
        cursor: 'pointer',
        '&:hover':{
          backgroundColor: theme.palette.background.hoverPost,
        }
      },
      icon:{
        fontSize: '1.5rem',
        marginRight: '0.5rem'
      },
      more:{
        position:"absolute",
        right:"5px",
        top:"5px",
        color:"rgb(139, 152, 165)",
        '&:hover':{
          backgroundColor: "rgba(29, 155, 240,0.1) !important",
          color: "rgb(29, 155, 240)"
        }
      },
    }
  ))

const MoreButton = ({postId}) => {
    const theme = useTheme()
    const styles = useStyles({theme});
    const [anchorEl, setAnchorEl] = useState(null);
    const [openTooltip, setOpenTooltip] = useState(false);
    const {user} = useContext(AuthContext);
    const {setEditModalOpen,setQuoteModalOpen,setIdEditPost} = useContext(ModalContext)
    const post = usePost(postId)
    const {handleDelete} = useUserPost(post?.user_id)
    const {handleFollow,followed} = useFollow(post?.user_id)


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpenTooltip(false);
      };
    
    const handleClose = (e) => {
      e.stopPropagation();
      setAnchorEl(null);
    };

    const handleEditClick = ()=>{
      // normal edit modal call
      setIdEditPost(post?.id)
      if(!post?.repost_id){

        setEditModalOpen(true)
      }
      // quote modal call
      else{
        setQuoteModalOpen(true)
      }

    }
    const popoverButtons = post?.user_id==user?.id ?
    [
      {icon:RiDeleteBinLine,action:()=>handleDelete(post?.id),text:"Delete Post"},
      {icon:FaEdit,action:()=>{handleEditClick()},text:"Edit Post"}
    ] :
    [
      {
        icon:followed ? MdOutlinePersonRemove : MdOutlinePersonAddAlt,
        action:handleFollow,
        text:`${followed ? "Unfollow" : "Follow"} ${post?.name}`
      }
    ]

    return (
        <>
            <Tooltip 
            open={openTooltip}
            onMouseOver={()=>{
                !open && setOpenTooltip(true)
            }}
            onMouseOut={()=>setOpenTooltip(false)}
            title="More" 
            className="d-flex align-items-center"
            >
                <IconButton 
                onClick={(e)=>{
                    e.stopPropagation()
                    handleClick(e)
                }}
                className={styles.more}>
                    <IoIosMore/>
                </IconButton>
            </Tooltip>

            <PopoverLayout
            anchorEl={anchorEl}
            handleClose={handleClose}
            buttons={popoverButtons}
            />

        </>
    )
}

export default MoreButton