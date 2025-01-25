import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ReloadContext } from "../contexts/ReloadContext";
import axiosInstance from "../axiosConfig";

export const useBookmark = (postId)=>{
    const [saved,setSaved] = useState(false)
    const {user} = useContext(AuthContext)
    const {savedList} = useContext(ReloadContext)

    useEffect(() => {
        const checkIfSaved = async () => {
          try {
            const response = await axiosInstance.get(`/posts/${postId}/isSaved`, {
              params: { userId: user?.id },
            });
            setSaved(response.data.saved);
          } catch (error) {
            console.error('Error checking if post is saved:', error);
          }
        };
        checkIfSaved()
      }, [postId, user?.id]);

    const handleSave = async () => {
    try {
        if (saved) {
            await axiosInstance.post(`/posts/${postId}/unsave`, {userId: user.id});
        } else {
            await axiosInstance.post(`/posts/${postId}/save`, {userId: user.id});
        }
        setSaved(!saved);
        savedList.update()
    } catch (error) {
        console.error('Error saving/unsaving post:', error);
    }
    };
    

    return{
        saved,
        handleSave
    }
}