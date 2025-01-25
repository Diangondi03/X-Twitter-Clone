import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import axiosInstance from '../../../axiosConfig';

const Switcher = styled(Switch)(({ theme }) => ({
  width: 56,
  height: 32,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 30,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 4,
    '&.Mui-checked': {
      transform: 'translateX(24px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#177ddc',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 24,
    height: 24,
    borderRadius: 12,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 32 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)',
    }),
  },
}));

export default function DarkModeButton(){
    const {user,loadDB} = useContext(AuthContext);
    const [darkMode, setDarkMode] = useState(null);
    useEffect(() => {
      if (user){
        setDarkMode(localStorage.getItem('dark_mode') === 'true')
        setDarkMode(user?.dark_mode);
      }
    }, [user]);
    const handleChange = async () => {
        try {
            const response = await axiosInstance.post(`/users/${user?.id}/dark-mode`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            loadDB();
        } catch (error) {
            console.error('Failed to toggle dark mode');
        }
    }

    if(darkMode === null){
      return null;
    }

    return(
        <Switcher checked={darkMode} onClick={handleChange}/>
    )
} 