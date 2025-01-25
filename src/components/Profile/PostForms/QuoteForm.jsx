// QuoteModal.js
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { useTheme } from '@emotion/react';
import QuotedPost from '../Post/QuotedPost';
import NormalPost from '../Post/NormalPost';
import PostFormLayout from './PostFormLayout';
import { useRepost } from '../../../hooks/useRepost';
import { ModalContext } from '../../../contexts/ModalContext';

const useStyles = createUseStyles((theme)=>({
  
  normalPost:{
    border:`1px solid ${theme?.palette?.divider}`,
    padding:"1rem",
    paddingLeft:"4rem",
    borderRadius:"1rem",
    marginBottom:"2rem"
  }
  
}))

const QuoteForm = ({post}) => {
  
  const theme = useTheme()
  const styles = useStyles({theme})

  const {handleRepost} = useRepost(post?.id)

  const {setQuoteModalOpen,setIdEditPost} = useContext(ModalContext)

  const extra =  <div className={styles.normalPost}>
    <NormalPost post={post}/>
    </div>
  
  const additionalResets = ()=>{
    setQuoteModalOpen(false)
    setIdEditPost(null)
  }


  return (

      <PostFormLayout
      contentDefault={''}
      imageDefault={null}
      placeholder={`Add your comment`}
      withImage={false}
      extra={extra}
      submitAction={handleRepost}
      additionalResets={additionalResets}
      />
  
        


  );
};

export default QuoteForm;