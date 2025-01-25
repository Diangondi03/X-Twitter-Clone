// QuoteModal.js
import React, { useContext } from 'react';
import PostForm from './PostForm'
import { useReply } from '../../../hooks/useReply';
import PostFormLayout from './PostFormLayout';
import { ModalContext } from '../../../contexts/ModalContext';


const ReplyForm = ({post}) => {
    const {handleReply} = useReply(post?.id)
    const {setReplyModalOpen,setIdEditPost} = useContext(ModalContext)
    const additionalResets = ()=>{
      setReplyModalOpen(false)
      setIdEditPost(false)

    }
    
    return (
        <PostFormLayout 
        contentDefault={''} 
        imageDefault={null}
        placeholder={`Post your reply`} 
        withImage={true} 
        submitAction={handleReply}
        additionalResets={additionalResets}
        />
    )

  }


export default ReplyForm;