import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import axiosInstance from "../axiosConfig";

export const useUserPost = (userId) => {
    const [user,setUser] = useState({})
    const [posts, setPosts] = useState([]);
    const [reloadPosts,setReloadPosts] = useState(false)
  
    useEffect(() => {
      const fetchUserPosts = async () => {
        try {
          const response = await axiosInstance.get(`/users/${userId}/posts`);
          setPosts(()=>response.data);
        } catch (err) {
          console.error('Error fetching user posts:', err);
        }
      };
  
      if (userId) {
        fetchUserPosts();
      }
    }, [userId,reloadPosts]);


    const handlePost = async(formData)=>{
      const response = await axiosInstance.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      window.location.reload();

    }

  
    const handleEdit = async (formData,postId) => {

      try {
        const response = await axiosInstance.put(`/posts/${postId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        window.location.reload();

      } catch (err) {
        console.error('Error editing user post:', err);
      }
    };
  
    const handleDelete = async (postId) => {
      try {
        await axiosInstance.delete(`/posts/${postId}`);
      
        setReloadPosts(!reloadPosts)
        window.location.reload();

      } catch (err) {
        console.error('Error deleting user post:', err);
      }
    };

    return {
      user,
      posts,
      handlePost,
      handleEdit,
      handleDelete
    };
}