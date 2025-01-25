import { useContext, useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../axiosConfig";

export const usePostReplies = (postId)=>{
    const [replies,setReplies] = useState([])


    useEffect(()=>{
        if(postId){

            const fetchReplies =async()=>{
                const res = await axiosInstance.get(`/posts/${postId}/replies`)
                setReplies(res.data)
            }
            fetchReplies()
        }
    },[postId])


    return replies
}