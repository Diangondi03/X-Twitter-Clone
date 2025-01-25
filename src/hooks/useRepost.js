import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import axiosInstance from "../axiosConfig";

export const useRepost = (postId) => {
    const [reposted,setReposted] = useState(false);
    const [reposts,setReposts] = useState(0);
    const [animateRepost,setAnimateRepost] = useState(false);
    const { user } = useContext(AuthContext);
  
    useEffect(() => {
      const checkIfReposted = async () => {
        try {
          const response = await axiosInstance.get(`/posts/${postId}/isReposted`, 
            {params: {userId:user?.id }}
          );
          setReposted(response.data.reposted);
        } catch (error) {
          console.error('Error checking if post is reposted:', error);
        }
      };
  
      const fetchReposts = async () => {
        try {
  
          const repostResponse = await axiosInstance.get(`/posts/${postId}/repostCount`);
          setReposts(repostResponse.data.repostCount);
        } catch (error) {
          console.error('Error fetching counts:', error);
        }
      }
  
      checkIfReposted();
      fetchReposts();
    }, [postId, user?.id,reposted]);
  
    const handleRepost = async (formData) => {
      try {
        if (reposted) {
          await axiosInstance.delete(`/posts/${postId}/undoRepost`, {params:{ userId: user.id }});
        } else {
          await axiosInstance.post(`/posts/${postId}/repost`, { userId: user.id,content:formData.get('content') });
        }
        setReposted(newreposted=>!newreposted);
        setAnimateRepost(true);
      } catch (error) {
        console.error('Error reposting post:', error);
      }
    };
    return{
      reposted,
      reposts,
      handleRepost,
      animateRepost,
    }
}