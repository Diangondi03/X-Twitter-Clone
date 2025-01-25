import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import axiosInstance from "../axiosConfig";

export const useReply = (postId)=>{
    const {user} = useContext(AuthContext)
    const [replyCount,setReplyCount] = useState(0)

    useEffect(()=>{
        if(user && postId){

            const fetchReplyCount =async()=>{
                const res = await axiosInstance.get(`/posts/${postId}/replyCount`)
                setReplyCount(res.data.replyCount)
            }
            fetchReplyCount()
        }
    },[user,postId])

    const handleReply = async (formData) => {
        try {
            const response = await axiosInstance.post(`/posts/${postId}/reply`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                }
            })
        } catch (error) {
            console.error('Error replying post:', error);
        }
        };

    return {replyCount,handleReply}
}