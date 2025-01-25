// QuoteModal.js
import React, { useContext } from 'react';
import QuotedPost from '../Post/QuotedPost';
import PostFormLayout from './PostFormLayout';
import { ModalContext } from '../../../contexts/ModalContext';
import { useUserPost } from '../../../hooks/useUserPost';
import { AuthContext } from '../../../contexts/AuthContext';


const EditQuoteForm = ({post}) => {
  
    const {user} = useContext(AuthContext);

    const {handleEdit} = useUserPost(user?.id)

    const {setQuoteModalOpen,setIdEditPost,setQuotePost} = useContext(ModalContext)

    const extra =  
    <div className='mb-4'>

    <QuotedPost post={post}/> 
    </div>


    
    const additionalResets = ()=>{
        setQuoteModalOpen(false)
        setIdEditPost(null)
        setQuotePost(false)
    }


    return (

        <PostFormLayout
        contentDefault={post?.content}
        imageDefault={null}
        placeholder={`Add your comment`}
        withImage={false}
        extra={extra}
        submitAction={handleEdit}
        additionalSubmitParameters={post?.id}
        additionalResets={additionalResets}
        />
    
            


    );
};

export default EditQuoteForm;