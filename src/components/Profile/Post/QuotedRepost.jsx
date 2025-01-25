import { useNavigate } from "react-router-dom";
import { Card, CardContent, IconButton, Tooltip, Typography, useTheme } from "@mui/material";
import { formatDate } from "../../../utils/formatDate";
import PostButtons from "./Buttons/PostButtons";
import { IoIosMore } from "react-icons/io";
import { useStyles } from "./postStyles";
import QuotedPost from "./QuotedPost";
import ProfileImage from "../ProfileImage";

export default function QuotedRepost({post}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const styles = useStyles({ theme });

  const goToProfile = (e) => {
    e.stopPropagation();
    navigate(`/user/${post.user_id}`);
  };

  const goToPost = () => {
    navigate(`/post/${post.id}`);
  }

  return (
    post && 
      <>
        <div className={styles.photoDiv}>

          <ProfileImage image_url={post?.profile_image_url}/>
        </div>

        <div className="d-flex">
          <Typography onClick={goToProfile} className={styles.name}>
            {post.name}
          </Typography>
          <Typography className={styles.username}>@{post.username}</Typography>
          
          <b className={styles.point}>·</b>

          <Typography className={styles.date}>
            {formatDate(new Date(post.created_at))}
          </Typography>
        </div>
        <Typography className={styles.content} style={{ wordWrap: "break-word" }}>
          {post.content}
        </Typography>
        {post.image_url && (
          <img
            src={`http://localhost:5000${post.image_url}`} // Ensure the URL is correct
            alt="post"
            className={styles.image} // Limit the size of the image
          />
        )}
        <QuotedPost post={post} />
      </>
    
  );
}