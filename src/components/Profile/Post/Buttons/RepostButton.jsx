import React, { useContext, useRef, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { FaRetweet } from "react-icons/fa6";
import { useRepost } from '../../../../hooks/useRepost';
import { usePost } from '../../../../hooks/usePost';
import PopoverLayout from '../../PopoverLayout';
import { FiEdit3 } from 'react-icons/fi';
import { ModalContext } from '../../../../contexts/ModalContext';

function RepostButton({ postId }) {
  const { reposted, reposts,animateRepost, handleRepost } = useRepost(postId);
  const [anchorEl, setAnchorEl] = useState(null);
  const buttonRef = useRef(null);
  const [openTooltip, setOpenTooltip] = useState(false);
  const {setQuoteModalOpen,setIdEditPost,setQuotePost} = useContext(ModalContext)

  const handleClickRef = (e) => {
    e.stopPropagation();
    buttonRef.current && buttonRef.current.click();
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenTooltip(false);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };

  const handleQuoteClick = ()=>{
    setIdEditPost(postId)
    setQuotePost(true)
    setQuoteModalOpen(true)

  }

  const open = Boolean(anchorEl);

  return (
    <Tooltip 
    open={openTooltip} 
    onMouseOver={()=>{
      !open && setOpenTooltip(true)
    }}
    onMouseOut={()=>setOpenTooltip(false)} 
    title="Repost" 
    className="d-flex align-items-center">
      <div>

        <PopoverLayout
        anchorEl={anchorEl}
        handleClose={handleClose}
        buttons={[
          {icon:FaRetweet,action:async()=>{
            const formData = new FormData();
            formData.append('content', "");
            await handleRepost(formData)
          }
            ,text:reposted ? "Undo Repost" : "Repost"},
          {icon:FiEdit3,action:()=>handleQuoteClick(),text:"Quote"},
        ]}
        />

        <IconButton 
        ref={buttonRef}
        onClick={(e)=>{
          e.stopPropagation()
          handleClick(e)
        }} 
        className={`post-button repost ${reposted ? 'reposted' : ''} ${animateRepost ? 'animate' : ''}`}
        >

          <FaRetweet className="post-button-icon" />

        </IconButton>

        <h6 
        className="m-0 repost-count"
        onClick={handleClickRef} 
        >{reposts}</h6>
      </div>

    </Tooltip>
  );
}

export default RepostButton;