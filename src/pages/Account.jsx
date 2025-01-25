import { useParams } from "react-router-dom"
import Head from "../components/Profile/Account/Head"
import { Grid2 } from "@mui/material"
import Tabs from "../components/Profile/Account/Tabs"
import { useEffect } from "react"
import { useUser } from "../hooks/useUser"

export default function Account(){
    const {userId} = useParams()
    const profile = useUser(userId)
    
    useEffect(()=>{
        window.scrollTo(0,0)
    },[userId])
    if(profile === undefined) return <h1 className="text-center mt-2">User not Found</h1>

    return(
        <Grid2>
            <Head profile={profile}/>
            <Tabs/>
        </Grid2>
    )
}