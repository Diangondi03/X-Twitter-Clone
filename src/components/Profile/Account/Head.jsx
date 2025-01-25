import { Button, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { useUserFollows } from "../../../hooks/useUserFollows"
import { useFollow } from "../../../hooks/useFollow"
import { useTheme } from "@emotion/react"
import { createUseStyles } from "react-jss"
import ProfileImage from "../ProfileImage"

const useStyles = createUseStyles((theme)=>({
    photo:{
        marginLeft:"1rem",
        marginRight:"2rem"
    },
    username:{
        margin:"0px",
        color:"gray"
    },
    following:{
        margin:"0px",
        color:"gray"
    },
    followers:{
        marginLeft:"1.5rem",
        color:"gray"
    },
    button:{
        position:"absolute",
        right:"1rem",
        fontWeight:"bold",
        padding:"0.5rem 1rem", 
        borderRadius:"20px",
        textTransform:"capitalize",
        width:"6rem"
    },
    followed:{
        backgroundColor:theme?.palette?.background?.default,
        color:theme?.palette?.color?.default,
        border:`1px solid ${theme?.palette?.color?.default}`
    },
    unfollowed:{
        backgroundColor:theme?.palette?.background?.opposite,
        color:theme?.palette?.color?.opposite,

    }
}))

export default function Head({profile}){
    const {user} = useContext(AuthContext)
    const {followers,following} = useUserFollows(profile?.id)
    const {followed,handleFollow} = useFollow(profile?.id)
    const [buttonText,setButtonText] = useState("")
    const theme = useTheme()
    const styles = useStyles({theme})

    useEffect(()=>{
        if(profile && user){
            if(followed){
                setButtonText("Following")
            }
            else{
                setButtonText("Follow")
            }
        }
    },[followed,user])

    const handleMouseEnter = () => {
        if(followed){

            setButtonText('Unfollow');
        }
      };
    
      const handleMouseLeave = () => {
        if(followed){

            setButtonText('Following');
        }
      };


    if(!profile?.id || !user?.id){
        return
    }

    return(
        <div className="d-flex align-align-items-baseline m-3 position-relative">
            <div className={styles.photo}>

                <ProfileImage image_url={profile?.profile_image_url} size="100px"/>
            </div>
            
            <div>

            <Typography variant="h4" component="h1" className="m-0" gutterBottom>
            {profile?.name}
            </Typography>
            <Typography variant="subtitle1" component="h2" className={styles.username} gutterBottom>
            @{profile?.username}
            </Typography>
            <div className="d-flex">

                <Typography variant="subtitle1" component="h2" className={styles.following} gutterBottom>
                <b>{following}</b> Following
                </Typography>
                <Typography variant="subtitle1" component="h2" className={styles.followers} gutterBottom>
                <b>{followers}</b> Followers
                </Typography>
            </div>
            </div>

            {profile?.id!=user?.id && 
                <Button 
                onClick={handleFollow} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                variant=""
                style={buttonText=='Unfollow' ? {backgroundColor:"rgba(255,0,0,0.1)",color:"red",borderColor:"red"}:{}} 
                className={`${styles.button} ${followed ? styles.followed : styles.unfollowed}`}
                >
                    {buttonText}
                </Button>
            }
        </div>
    )
}