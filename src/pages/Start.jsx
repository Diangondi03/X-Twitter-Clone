// Home.js
import React, { useEffect } from 'react';
import { Container, Box, Typography, Button, Grid, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';
import TwitterLogo from '../assets/logo.avif'; // Make sure to have a Twitter logo image in your project
import "../components/Start/styles.css"


const Start = () => {

  useEffect(()=>{
    document.body.classList.add("body-dark")

    return ()=>{
    document.body.classList.remove("body-dark")

    }
  },[])

  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={0} style={{ height: '100vh'}}>
        <Grid2 item size={{xs:12,md:6}} style={{ backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={TwitterLogo} alt="Twitter Logo" style={{ width: '50%' }} />
        </Grid2>
        <Grid2 item size={{xs:12,md:6}} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box textAlign="center">
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to X {'(Twitter)'} Clone
            </Typography>
            <Typography variant="h6" component="p" gutterBottom sx={{p:4}}>
              Connect with your friends and the world around you.
            </Typography>
            <Grid2 container spacing={3} justifyContent="center">
              <Grid2 item>
                <Button
                  component={Link}
                  to="/signup"
                  variant="contained"
                  color="primary"
                >
                  Sign Up
                </Button>
              </Grid2>
              <Grid2 item>
                <Button
                  component={Link}
                  to="/login"
                  variant="outlined"
                  color="primary"
                >
                  Login
                </Button>
              </Grid2>
            </Grid2>
            
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Start;