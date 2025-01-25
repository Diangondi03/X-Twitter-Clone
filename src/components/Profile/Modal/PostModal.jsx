import React, { useContext } from 'react'
import PostForm from '../PostForms/PostForm'
import ModalLayout from './ModalLayout'
import { ModalContext } from '../../../contexts/ModalContext'
import { useFeed } from '../../../hooks/useFeed'

const PostModal = () => {
    const {reloadFeed} = useFeed();
    
    const {postModalOpen,setPostModalOpen} = useContext(ModalContext)
  return (
    <ModalLayout 
    open={postModalOpen} 
    handleClose={()=>{setPostModalOpen(false)}}
    >
      <PostForm/>
    </ModalLayout>
  )
}

export default PostModal