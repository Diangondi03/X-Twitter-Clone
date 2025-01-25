import { useSavedPost } from "../hooks/useSavedPost"
import Post from "../components/Profile/Post/Post"
import { Typography } from "@mui/material"

import ArrowButton from "../components/Profile/ArrowButton"
export default function BookmarkList(){
    const savedPosts = useSavedPost()

    return(
        <>
            <div className="d-flex align-items-center m-2">
                <ArrowButton/>
                <Typography variant="h5" component="h1" className="mx-2">Bookmarks</Typography>
            </div>
            {savedPosts && savedPosts.map((post,index)=>{
                return <Post post={post}/>
            })
            }
            {savedPosts === undefined && 
                <h2 className="mt-2 text-center">No saved posts</h2>
            }
        </>
    )
}