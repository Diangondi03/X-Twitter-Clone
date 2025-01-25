import { IconButton, Tooltip } from "@mui/material";
import { useContext } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { ModalContext } from "../../../../contexts/ModalContext";
import { useReply } from "../../../../hooks/useReply";

export default function ReplyButton({postId}){
    const {setIdEditPost,setReplyModalOpen} = useContext(ModalContext)
    const {replyCount} = useReply(postId)
    return(
        <Tooltip title="Reply" className="d-flex align-items-center">
            <div>
                <IconButton 
                className={`post-button reply`}
                onClick={(e)=>{
                    e.stopPropagation()
                    setIdEditPost(postId)
                    setReplyModalOpen(true)
                }}
                >
                    <FiMessageCircle className="post-button-icon"/>
                </IconButton>
                <h6 
                className="m-0 reply-count"
                onClick={(e)=>{
                    e.stopPropagation()
                }}
                >{replyCount}</h6>
            </div>
        </Tooltip>
    )
}