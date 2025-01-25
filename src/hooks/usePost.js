import axios from "axios"
import { useEffect, useState } from "react"
import axiosInstance from "../axiosConfig"

export const usePost = (postId) => {

    const [post,setPost] = useState(null)
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const postResponse = await axiosInstance.get(`/posts/${postId}`);
            setPost(postResponse.data);
          }
          catch (error) {
            console.error(`Error fetching post: ${error}`);
            setPost(undefined)
          }
        }
        fetchPost();
    }, [postId])
    return post
}

