import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ReloadContext } from "../contexts/ReloadContext";
import axiosInstance from "../axiosConfig";

export const useSavedPost = ()=>{
    const [savedPosts,setSavedPosts] = useState()
    const {user} = useContext(AuthContext)
    const {savedList} = useContext(ReloadContext)

    useEffect(()=>{
        const fetchSavedPosts = async()=>{
            try{
                const response = await axiosInstance.get(`/users/${user?.id}/savedPosts`);
                setSavedPosts(()=>response.data)
                if(response.data.length == 0){
                    setSavedPosts(()=>undefined)
                }
            }
         catch (err) {
            console.error('Error fetching saved posts:', err);
          }
        }
        fetchSavedPosts()
    },[savedList.reload])

    return savedPosts
}