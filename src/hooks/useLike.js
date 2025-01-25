import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import axiosInstance from "../axiosConfig";

export const useLike = (postId)=>{
    const [liked,setLiked] = useState(false)
    const [likes,setLikes] = useState(0)
    const [animateLike,setAnimateLike] = useState(false)
    const {user} = useContext(AuthContext)

    useEffect(() => {
        const checkIfLiked = async () => {
          try {
            const response = await axiosInstance.get(`/posts/${postId}/isLiked`, {
              params: { userId: user?.id },
            });
            setLiked(response.data.liked);
          } catch (error) {
            console.error('Error checking if post is liked:', error);
          }
        };
        const fetchLikes = async () => {
          try {
            const likeResponse = await axiosInstance.get(`/posts/${postId}/likeCount`);
            setLikes(likeResponse.data.likeCount);

          } catch (error) {
            console.error('Error fetching counts:', error);
          }
        }      
    
        checkIfLiked();
        fetchLikes();
      }, [postId, user?.id, liked]);


    const handleLike = async () => {
    try {
        if (liked) {
        await axiosInstance.post(`/posts/${postId}/unlike`, {userId: user.id});
        } else {
        await axiosInstance.post(`/posts/${postId}/like`, {userId: user.id});
        }
        setLiked(newLiked => !newLiked);
        setAnimateLike(true);
    } catch (error) {
        console.error('Error liking/unliking post:', error);
    }
    };

    return{
        liked,
        likes,
        handleLike,
        animateLike,
    }
}