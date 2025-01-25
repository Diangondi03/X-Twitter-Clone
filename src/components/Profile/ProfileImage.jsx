import { useTheme } from '@emotion/react'
import React from 'react'
import { createUseStyles } from 'react-jss'
import { IoPersonCircle } from "react-icons/io5";

const useStyles = createUseStyles((theme) => ({
    photo: {

        backgroundColor: 'gray',
        borderRadius: '50%',

    },
    defaultPhoto: {
        width: '100%',
        height: '100%',
        color: theme?.palette?.background?.default || "#222",
        
    },
}))


const ProfileImage = ({image_url,size='40px',preview=false}) => {
    const theme = useTheme()
    const styles = useStyles({theme})
    return (
        <div className={styles.photo} style={{width:size,height:size}}>
                {image_url || preview ?
                    <img
                    src={preview ? preview : `http://localhost:5000${image_url}`} // Ensure the URL is correct
                    alt="Profile"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} // Make it a circle
                    /> :
                    <IoPersonCircle className={styles.defaultPhoto}/>
                }
        </div>
    )
}

export default ProfileImage