import { IconButton, Tooltip } from "@mui/material"
import { useLike } from "../../../../hooks/useLike"
import { FaHeart, FaRegHeart } from "react-icons/fa6"

export default function LikeButton({postId}){
    const {liked,likes,handleLike,animateLike} = useLike(postId)


    return(
      <Tooltip title="Like" className="d-flex align-items-center">
        <div>

          <IconButton
          onClick={(e)=>{
            e.stopPropagation()
            handleLike()
          }}
          className={`post-button like ${liked  ? 'liked' : ''} ${animateLike ? 'animate': ''}`}>
            {liked ? 
            <FaHeart className="post-button-icon" />: 
            <FaRegHeart className="post-button-icon" />
            }
          </IconButton>
          <h6 
          className="m-0 like-count"        
          onClick={(e)=>{
            e.stopPropagation()
            handleLike()
          }}
          >{likes}</h6>
        </div>
        
      </Tooltip>
    )
}