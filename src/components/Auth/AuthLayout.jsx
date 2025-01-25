// AuthLayout.js
import React, { useEffect } from 'react';
import { Container, Box, Typography } from '@mui/material';
import "./styles.css"


const AuthLayout = ({ title, children }) => {
  useEffect(()=>{
    // Add the CSS class to the body element
    document.body.classList.add('auth-background');

    // Remove the CSS class when the component is unmounted
    return () => {
      document.body.classList.remove('auth-background');
    };
  },[])
  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography align='center' variant="h4" component="h1" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  );
};

export default AuthLayout;