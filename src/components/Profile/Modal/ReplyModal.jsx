import React, { useContext, useEffect, useState } from 'react'
import ModalLayout from './ModalLayout'
import { ModalContext } from '../../../contexts/ModalContext'
import { useFeed } from '../../../hooks/useFeed'
import axios from 'axios'
import ReplyForm from '../PostForms/ReplyForm'
import { Box } from '@mui/material'
import QuotedRepost from '../Post/QuotedRepost'
import NormalPost from '../Post/NormalPost'
import { createUseStyles } from 'react-jss'
import { useTheme } from '@emotion/react'
import axiosInstance from '../../../axiosConfig'

const useStyles = createUseStyles((theme)=>({
  container:{
    marginBottom:"1rem",
    position:"relative",
    paddingLeft:"3.5rem",
  },
  repliedPost:{
    border:`1px solid ${theme?.palette?.divider}`,
    padding:"1rem",
    borderRadius:"1rem",
    position:"relative",
    paddingLeft:"4rem",
    right:"3rem"
  },
  formDiv:{
    position:"relative",
    right:"3rem"
  }
}))


const ReplyModal = () => {
    const {reloadFeed} = useFeed();
    const {replyModalOpen,setReplyModalOpen,idEditPost,setIdEditPost} = useContext(ModalContext)
    const [post,setPost] = useState(null)
    const theme = useTheme()
    const styles = useStyles({theme})

    useEffect(() => {
      if(idEditPost){

        const fetchPost = async () => {
          try {
            const postResponse = await axiosInstance.get(`/posts/${idEditPost}`);
            setPost(postResponse.data);
          }
          catch (error) {
            console.error(`Error fetching post: ${error}`);
          }
        }
        fetchPost();
      }
  }, [idEditPost])
  return (
    
    post &&
      
      <ModalLayout 
      open={replyModalOpen} 
      handleClose={()=>{
        setReplyModalOpen(false)
        setIdEditPost(null)
        setPost(null)
      }}
      >
        <Box className={styles.container}>
          <div className={styles.repliedPost}>
              {post && post.repost_id ?  
                  <QuotedRepost post={post}/>:
                  <NormalPost post={post}/>
              }
          </div>
          <div className={styles.formDiv}>
          
            <ReplyForm
            post={post}
            />
        </div>
        </Box>
      </ModalLayout>
    
  )
}

export default ReplyModal