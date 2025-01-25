import axios from "axios"
import { useEffect, useState } from "react"
import axiosInstance from "../axiosConfig"

export const useUserMedia = (userId) => {
    const [media,setMedia] = useState([])
    useEffect(() => {
        const FetchMedia = async () => {
            try {
                const res = await axiosInstance.get(`/users/${userId}/media`)
                setMedia(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        FetchMedia()
    },[userId])

    return media
}