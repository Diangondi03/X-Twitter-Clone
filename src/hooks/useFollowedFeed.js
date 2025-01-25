import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axiosInstance from "../axiosConfig";

export const useFollowedFeed = () =>{
    const [followedFeed, setFollowedFeed] = useState(null);
    const {user} = useContext(AuthContext)

    useEffect(() => {
        if(user?.id){

            const fetchFollowedFeed = async () => {
                try {
                    const response = await axiosInstance.get(`/users/${user?.id}/followedPosts`);
                    
                    setFollowedFeed(()=>response.data);
                    
                } catch (err) {
                    console.error('Error fetching feed:', err);

                }
            };
            
            fetchFollowedFeed();
        }
    }, [user?.id]);
    return followedFeed
  }