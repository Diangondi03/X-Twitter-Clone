import axios from "axios"
import { useEffect, useState } from "react"
import axiosInstance from "../axiosConfig"

export const useUserReplies = (userId) => {
    const [replies,setReplies] = useState([])
    useEffect(() => {
        const FetchReplies = async () => {
            try {
                const res = await axiosInstance.get(`/users/${userId}/replies`)
                setReplies(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchReplies()
    },[userId])

    return replies
}