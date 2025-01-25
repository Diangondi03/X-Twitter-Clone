import { FiMessageCircle } from "react-icons/fi";
import LikeButton from './LikeButton';
import './PostButtons.css'

import BookmarkButton from "./BookmarkButton";
import RepostButton from "./RepostButton";
import ReplyButton from "./ReplyButton";

export default function PostButtons({postId}) {
    const buttons = [
        <ReplyButton postId={postId}/>,
        <RepostButton postId={postId}/>,
        <LikeButton postId={postId}/>
    ]
    return(
        <div className="d-flex">

            <div className=" d-flex" style={{width:"100%"}}>

            {buttons.map((button,index) => (
                <div 
                key={index}
                style={{
                    width:"calc(100%/3)",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center"
                }}>
                    {button}
                </div>
            ))}
            </div>
            <BookmarkButton postId={postId}/>
        </div>
    )
}
