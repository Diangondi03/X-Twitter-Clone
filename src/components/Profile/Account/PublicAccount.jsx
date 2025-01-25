// Profile.js
import React from 'react';
import { Typography, Grid2 } from '@mui/material';
import { useUserPost } from '../../../hooks/useUserPost';
import Post from '../Post/Post';

const PublicAccount = ({userId}) => {

  const {      
    user,
    posts,
  } = useUserPost(userId);

  return (
      <>
        {posts && posts.map((post,index) => {
          return <Post key={index} post={post} />
        })}
      </>
  );
};

export default PublicAccount;