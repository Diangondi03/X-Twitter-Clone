import { usePost } from "../hooks/usePost"
import Post from "../components/Profile/Post/Post"
import { useParams } from "react-router-dom"

import ArrowButton from "../components/Profile/ArrowButton"
import PostForm from "../components/Profile/PostForms/PostForm"
import { usePostReplies } from "../hooks/usePostReplies"
import ReplyForm from "../components/Profile/PostForms/ReplyForm"


export default function ExpandedPost() {
  const {postId} = useParams()
  const post = usePost(postId)
  const replies = usePostReplies(postId)

  if(post === undefined) return <h1 className="text-center mt-2">Post not Found</h1>

    return (post &&
      <>
        <div className="d-flex m-2 align-items-center">
          <ArrowButton/>
          <h3 className="m-0 mx-2">Post</h3>
        </div>
        <Post post={post}/>
        <ReplyForm post={post}/>
        {replies &&
          replies.map((replyPost,index)=>(
            <Post post={replyPost} key={index}/>
          ))
        }
      </>
    )
}