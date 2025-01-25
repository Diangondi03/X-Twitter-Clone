import axios from "axios"
import { useEffect, useState } from "react"
import axiosInstance from "../axiosConfig"

export const useUserLikes = (userId) => {
    const [likedPosts,setLikedPosts] = useState([])
    useEffect(() => {
        const FetchLikedPosts = async () => {
            try {
                const res = await axiosInstance.get(`/users/${userId}/likes`)
                setLikedPosts(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchLikedPosts()
    },[userId])

    return likedPosts
}