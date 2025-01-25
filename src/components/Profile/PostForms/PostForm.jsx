import React, { useContext, useEffect, useRef, useState } from 'react';

import PostFormLayout from './PostFormLayout';
import { useUserPost } from '../../../hooks/useUserPost';
import { AuthContext } from '../../../contexts/AuthContext';
import { ModalContext } from '../../../contexts/ModalContext';



const PostForm = () => {
  const {user} = useContext(AuthContext);
  const {handlePost} = useUserPost(user?.id);
  const {setPostModalOpen} = useContext(ModalContext)
  const additionalResets = ()=>{
    setPostModalOpen(false)
  }
  return(

    <PostFormLayout 
    contentDefault={''} 
    imageDefault={null} 
    placeholder={"What's happening?!"}
    withImage={true} 
    submitAction={handlePost}
    additionalResets={additionalResets}
    />
  )

};

export default PostForm;