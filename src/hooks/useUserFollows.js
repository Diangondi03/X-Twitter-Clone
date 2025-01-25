import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosConfig";

export const useUserFollows = (userId)=>{
    const [followers,setFollowers] = useState(0)
    const [following,setFollowing] = useState(0)

    useEffect(() => {
        const fetchFollowerCount = async () => {
          try {
            const response = await axiosInstance.get(`/users/${userId}/followerCount`,{});
            setFollowers(response.data.followerCount);
          } catch (error) {
            console.error('Error checking followers:', error);
          }
        };
        const fetchFollowingCount = async () => {
            try {
              const response = await axiosInstance.get(`/users/${userId}/followingCount`,{});
              setFollowing(response.data.followingCount);
            } catch (error) {
              console.error('Error checking following:', error);
            }
          };
        fetchFollowerCount()
        fetchFollowingCount()
      }, [ userId]);


    return {followers,following}
}