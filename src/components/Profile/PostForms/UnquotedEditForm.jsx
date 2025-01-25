// QuoteModal.js
import React, { useContext } from 'react';
import PostFormLayout from './PostFormLayout';
import { ModalContext } from '../../../contexts/ModalContext';
import { useUserPost } from '../../../hooks/useUserPost';
import { AuthContext } from '../../../contexts/AuthContext';


const EditQuoteForm = ({post}) => {
  
    const {user} = useContext(AuthContext);

    const {handleEdit} = useUserPost(user?.id)

    const {setEditModalOpen,setIdEditPost} = useContext(ModalContext)

  
    const additionalResets = ()=>{
      setEditModalOpen(false)
      setIdEditPost(null)
    }


    return (

        <PostFormLayout
        contentDefault={post?.content}
        imageDefault={post?.image_url}
        placeholder={`Add your comment`}
        withImage={true}
        submitAction={handleEdit}
        additionalSubmitParameters={post?.id}
        additionalResets={additionalResets}
        />
    
            


    );
};

export default EditQuoteForm;