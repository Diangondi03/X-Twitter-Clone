import React, { useContext, useEffect, useState } from 'react'
import ModalLayout from './ModalLayout'
import { ModalContext } from '../../../contexts/ModalContext'
import axios from 'axios'
import UnquotedEditForm from '../PostForms/UnquotedEditForm'
import axiosInstance from '../../../axiosConfig'

const UnquotedEditModal = () => {
    const {editModalOpen,setEditModalOpen,idEditPost,setIdEditPost} = useContext(ModalContext)
    const [post,setPost] = useState(null)

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
    
    post && post?.id === idEditPost &&
      
      <ModalLayout 
      open={editModalOpen} 
      handleClose={()=>{
        setEditModalOpen(false)
        setIdEditPost(null)
        setPost(null)
      }}
      >
      <UnquotedEditForm post={post}/>

      </ModalLayout>
    
  )
}

export default UnquotedEditModal