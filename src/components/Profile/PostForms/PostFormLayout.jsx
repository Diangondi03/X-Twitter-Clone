import React, { useContext, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { AuthContext } from '../../../contexts/AuthContext'
import ImageInputButton from './ImageInputButton';
import PostButton from './PostButton';
import { isEmptyOrWhitespace } from '../../../utils/isEmpty';
import { useTheme } from '@emotion/react';
import { TiDelete } from "react-icons/ti";
import { useStyles } from './postFormsStyles';
import TextInput from './TextInput';
import ProfileImage from '../../Profile/ProfileImage';


const PostFormLayout = ({contentDefault,imageDefault,placeholder,withImage,extra,submitAction,additionalSubmitParameters,additionalResets}) => {
  const {user} = useContext(AuthContext)
  const inputRef = useRef(null);
  const [content, setContent] = useState(contentDefault);
  const [image, setImage] = useState(imageDefault);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(imageDefault);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);
  const theme = useTheme()
  const styles = useStyles({theme})


  const handleContentChange = (e) => {
    if(e.target.value.length<=280){
      setContent(e.target.value);
    }
  };

  const handleImageChange = (e) => {
    const imageSubmit = e.target.files[0];	
    if (imageSubmit) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(imageSubmit);
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(imageSubmit);
    }
  };

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    formData.append('userId', user.id);
    if (image) {
      formData.append('image', image);
    }
    if(!content){
      setError("You cannot create an empty post")
      return
    }
    if(additionalSubmitParameters){

        submitAction(formData,additionalSubmitParameters);
    }
    else{
        submitAction(formData);
    }
    additionalResets()

    setContent('');
    setImage(null);
    setImagePreviewUrl(null)


  };

  const deleteImage = ()=>{
    setImage(null)
    setImagePreviewUrl(null)
  }

  return (
    <Box className={styles.container}>
      <div className='position-absolute' style={{left:"1rem",top:"1.5rem"}} >

      <ProfileImage image_url={user?.profile_image_url}/>
      </div>

      <form onSubmit={handleSubmit} className='position-relative'>
        
        <TextInput
        inputRef={inputRef}
        placeholder={placeholder}
        value={content}
        onChange={handleContentChange}
        />

        <div className={styles.imageDiv}>
          {imagePreviewUrl && (
            <TiDelete className={styles.deleteImage} onClick={()=>deleteImage()}/>
          )}
          {imagePreviewUrl && imagePreviewUrl==imageDefault && (
            <img src={`http://localhost:5000${imagePreviewUrl}`} alt="post" style={{ width: '100%', maxWidth:"500px",maxHeight:"500px",objectFit:"contain",backgroundColor:"black"}} />
          )}
          {imagePreviewUrl && imagePreviewUrl!=imageDefault && (
            <img src={imagePreviewUrl} alt="post" style={{ width: '100%', maxWidth:"500px",maxHeight:"500px"}} />
          )}
        </div>

        {extra}

        <div className='position-relative' style={{minHeight:"2rem"}}>
          {withImage && <ImageInputButton fileInputRef={fileInputRef} handleImageChange={handleImageChange} handleIconClick={handleIconClick}/>}
          <PostButton status={isEmptyOrWhitespace(content)}/>
        </div>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

      </form>
    </Box>
  );
};

export default PostFormLayout;