import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import axiosInstance from "../axiosConfig";

export const useFollow = (followedId)=>{
    const [followed,setFollowed] = useState(false)
    const {user} = useContext(AuthContext)


    useEffect(() => {
      if(followedId && user?.id){

        const checkIfFollowed = async () => {
          try {
            const response = await axiosInstance.get(`/users/${followedId}/isFollowing`, {params: {followerId:user?.id}});
            setFollowed(response.data.isFollowing);
          } catch (error) {
            console.error('Error checking if user was followed:', error);
          }
        };
        
        checkIfFollowed()
      }
      }, [ followedId,user?.id]);

    const handleFollow = async () => {
        try {
            if (followed) {
            await axiosInstance.delete(`/users/${followedId}/unfollow`, {params:{followerId:user.id}});
            } else {
            await axiosInstance.post(`/users/${followedId}/follow`, {followerId:user.id});
            }
            setFollowed(newFollowed=>!newFollowed);
        } catch (error) {
            console.error('Error following/unfollowing user:', error);
        }
        };

    return {followed,handleFollow}
}