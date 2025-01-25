// Home.js
import React, { useContext, useEffect, useState} from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { AuthContext } from '../../../contexts/AuthContext';
import { Outlet } from 'react-router-dom';
import { colors, createTheme, CssBaseline, Grid2, IconButton, ThemeProvider } from '@mui/material';
import {useStyles} from './styles';
import { getInitialTheme, saveTheme } from '../../../utils/theme';
import SearchSection from '../SearchSection/SearchSection';
import PostModal from '../Modal/PostModal';
import UnquotedEditModal from '../Modal/UnquotedEditModal';
import QuoteModal from '../Modal/QuoteModal';
import { IoCreateOutline } from 'react-icons/io5';
import { ModalContext } from '../../../contexts/ModalContext';
import ReplyModal from '../Modal/ReplyModal';
import MobileTopNav from '../../MobileTopNav';
import WhoToFollow from '../SearchSection/WhoToFollow';


const ProfileLayout = () => {
  const { user } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(getInitialTheme());
  const {setPostModalOpen} = useContext(ModalContext)

  useEffect(() => {
    if (user) {
      setDarkMode(user.dark_mode);
      saveTheme(user.dark_mode);
    }
  }, [user]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#ffffff' : '#111',
      },
      secondary: {
        main: darkMode ? '#f48fb1' : '#d32f2f',
      },
      background: {
        default: darkMode ? 'rgb(21, 32, 43)' : '#ffffff',
        opposite: darkMode ? '#ffffff' : '#rgb(21, 32, 43)',
        tab: darkMode ? 'rgba(21, 32, 43,0.8)' : 'rgba(255,255,255,0.8)',
        paper: darkMode ? 'rgb(21,32,43)' : '#ffffff',
        hoverPost: darkMode ? 'rgb(25,36,47)': colors.grey[100],
        hoverRepost: darkMode ? 'rgb(35,46,57)': colors.grey[200],
        hoverSidebar: darkMode ? 'rgba(150,150,150,0.2)': colors.grey[100],
        searchBar: darkMode ? 'rgb(35,46,57)': colors.grey[200],
      },
      color: {
        default: darkMode ? 'whitesmoke' : '#000000',
        opposite: darkMode ? '#000000' : 'whitesmoke',
      },
    },
    typography: {
        fontFamily: 'Chirp, "Helvetica Neue", Arial, sans-serif',
    },

});

  const styles = useStyles({theme});

  return (
        <ThemeProvider theme={theme}>
          
          <CssBaseline />
          <Grid2 container className={styles.container}>
            <Grid2 size={{xs:12,sm:0}} sx={{display:{xs:"unset",md:"none"},height:"7.5vh"}}></Grid2>

            <Grid2 size={{xs:12,sm:2,md:1.5,lg:2.5}} className={styles.aside}>
              <Sidebar />
            </Grid2>
            <Grid2 size={{xs:12,sm:10,md:7,lg:6}} className={styles.main}>

              <Outlet/>
            </Grid2>

            <Grid2 size={{md:3.5}} sx={{display:{xs:"none",md:"unset"}}} className={styles.searchDiv}>

              <Grid2 size={{md:3.5}} sx={{display:{xs:"none",md:"unset"},position:"fixed"}}>
                <SearchSection/>  
              </Grid2>

            </Grid2>

            <Grid2 size={{xs:12,sm:0}} sx={{display:{xs:"flex",sm:"none"}}} className={styles.mobileTopDiv}>
              <MobileTopNav/>
            </Grid2>
          </Grid2>

          <IconButton 
          variant='contained' 
          onClick={()=>{setPostModalOpen(true)}}
          className={styles.fixedButton} 
          sx={{display:{xs:"auto",sm:"none"}}}>
            <IoCreateOutline/>
          </IconButton>
          
          <PostModal/>
          <UnquotedEditModal/>
          <QuoteModal/>
          <ReplyModal/>

        </ThemeProvider>
  );
};

export default ProfileLayout;