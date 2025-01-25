// Profile.js
import React, { useState } from 'react';
import { Typography, Card, CardContent, IconButton, TextField, Button, Grid2, colors, Tab, Tabs, Box } from '@mui/material';
import { useUserPost } from '../../../hooks/useUserPost';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Post from '../Post/Post';
import Posts from './Tab/Posts';
import Likes from './Tab/Likes';


const PersonalAccount = ({userId}) => {

  const [value,setValue] = useState(1)

  const handleChange = (e,newValue)=>{
    setValue(newValue)
  }
  const tabPanels = [<Posts/>,<Likes/>]


  return (
      <>

        
          
      </>
  );
};

export default PersonalAccount;