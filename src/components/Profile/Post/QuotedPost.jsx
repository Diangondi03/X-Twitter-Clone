import React from 'react'
import { useStyles } from './postStyles'
import { useTheme } from '@emotion/react'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { formatDate } from '../../../utils/formatDate';
import ProfileImage from '../ProfileImage';

const QuotedPost = ({post}) => {
    const navigate = useNavigate();
    const theme = useTheme()
    const styles = useStyles({theme})

    const goToRepostedProfile = (e) => {  
        e.stopPropagation();
        navigate(`/user/${post.repost_user_id}`);
    }

    const goToResposted = (e) => {
        e.stopPropagation();
        navigate(`/post/${post.repost_id}`);
    }
    return (
        <Card className={styles.repost} onClick={goToResposted}>
        <CardContent sx={{ paddingBottom: post.repost_image_url ? "0px !important" : ""}}>
        <div className={styles.photoDiv}>

            <ProfileImage image_url={post?.repost_profile_image_url}/>
        </div>

        <div className="d-flex">
            <Typography className={styles.name} onClick={goToRepostedProfile}>
            {post.repost_name}
            </Typography>
            <Typography className={styles.username}>
            @{post.repost_username} 
            </Typography>
            <b className={styles.point}>·</b>
            <Typography className={styles.date}>
            {formatDate(new Date(post.repost_created_at))}
            </Typography>
        </div>
        <Typography className={styles.content} style={{ wordWrap: "break-word" }}>
            {post.repost_content}
        </Typography>
        {post.repost_image_url && (
            <img
            src={`http://localhost:5000${post.repost_image_url}`} // Ensure the URL is correct
            alt="original post"
            className={styles.repost_image} // Limit the size of the image
            />
        )}
        </CardContent>
    </Card>
  )
}

export default QuotedPost