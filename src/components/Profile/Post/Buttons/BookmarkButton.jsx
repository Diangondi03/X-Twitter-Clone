import { IconButton, Tooltip } from "@mui/material";
import { FaRegBookmark,FaBookmark } from "react-icons/fa6";
import { useBookmark } from "../../../../hooks/useBookmark";

export default function BookmarkButton({postId}){
    const {saved,handleSave} = useBookmark(postId)
    return(
        <Tooltip title="Bookmark" className="d-flex align-items-center">

            <IconButton 
            className={`post-button save ${saved ? "saved" : ""}`} 
            onClick={(e)=>{
                e.stopPropagation()
                handleSave()
            }}>
                {saved ? 
                <FaBookmark className="post-button-icon"/>:
                <FaRegBookmark className="post-button-icon"/>
            }
            </IconButton>
        </Tooltip>
    )
}