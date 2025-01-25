import React, { useContext, useEffect, useState } from 'react'
import ModalLayout from './ModalLayout'
import { ModalContext } from '../../../contexts/ModalContext'
import { useFeed } from '../../../hooks/useFeed'
import axios from 'axios'
import QuoteForm from '../PostForms/QuoteForm'
import EditQuoteForm from '../PostForms/EditQuoteForm'
import axiosInstance from '../../../axiosConfig'

const QuoteModal = () => {
    const {quoteModalOpen,setQuoteModalOpen,idEditPost,setIdEditPost,quotePost,setQuotePost} = useContext(ModalContext)
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
      open={quoteModalOpen} 
      handleClose={()=>{
        setQuoteModalOpen(false)
        setIdEditPost(null)
        setPost(null)
        setQuotePost(false)
      }}
      >
      {quotePost ? 
        <QuoteForm post={post}/>:
        <EditQuoteForm post={post}/>
      }
      </ModalLayout>
    
  )
}

export default QuoteModal