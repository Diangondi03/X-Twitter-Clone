import axios from "axios"
import { useEffect, useState } from "react"
import axiosInstance from "../axiosConfig"

export const useUser = (userId) => {
    const [user,setUser] = useState({})
    useEffect(() => {
        const FetchUser = async () => {
            try {
                const res = await axiosInstance.get(`/users/${userId}`)
                setUser(res.data)
            } catch (error) {
                console.log(error)
                setUser(undefined)
            }
        }
        FetchUser()
    },[userId])

    return user
}