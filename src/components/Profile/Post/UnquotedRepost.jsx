import { useNavigate } from "react-router-dom";
import { Typography, useTheme } from "@mui/material"
import { formatDate } from "../../../utils/formatDate";
import { useStyles } from "./postStyles";
import ProfileImage from "../ProfileImage";

export default function UnquotedRepost({post}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = useStyles({theme});

  const goToRepostedProfile = (e)=>{
    e.stopPropagation()
    navigate(`/user/${post.repost_user_id}`)
  }
  
  return (post &&
          <>
            <div className={styles.photoDiv}>

              <ProfileImage image_url={post?.repost_profile_image_url}/>
            </div>

            <div className="d-flex">
              <Typography onClick={goToRepostedProfile} className={styles.name}>{post.repost_name}</Typography>

              <Typography className={styles.username}>
                @{post.repost_username}
              </Typography>
              <b className={styles.point}>·</b>

              <Typography className={styles.date}>{formatDate(new Date(post.repost_created_at))}</Typography>
            
            </div>
            <Typography className={styles.content} style={{wordWrap:"break-word"}}>{post.repost_content}</Typography> 
            
            {post.repost_image_url &&
              <img
              src={`http://localhost:5000${post.repost_image_url}`} // Ensure the URL is correct
              alt="post"
              className={styles.image} // Limit the size of the image
              />
            }
          </>
    )
}