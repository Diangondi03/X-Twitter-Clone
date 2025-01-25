// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user,setUser] = useState(null)
  const [load,setLoad] = useState(false)
  const navigate = useNavigate();

  const loadDB = ()=>{
    setLoad(current=>!current)
  }
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const fetchUser = async () => {
          try {
            const response = await axiosInstance.get(`/users/${decodedToken.id}`);
            setUser(()=>response.data);
          } catch (error) {
            navigate('/login');
            console.error('Error fetching user:', error);
          }
        }
        fetchUser();
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
        navigate('/login');

      }
    }
    else{
      navigate('/login');
    }
  }, [load]);

  const login = async (email, password) => {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', response.data.token);
      window.location.href = '/home';

  };

  const logOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';

  };

  return (
    <AuthContext.Provider value={{ user, login, logOut ,loadDB}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };