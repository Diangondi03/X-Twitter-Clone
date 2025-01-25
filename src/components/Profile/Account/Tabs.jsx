import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { useParams } from "react-router-dom"
import { useUserLikes } from "../../../hooks/useUserLikes"
import { useUserPost } from "../../../hooks/useUserPost"
import TabLayout from "../TabLayout"
import { useUserReplies } from "../../../hooks/useUserReplies"
import { useUserMedia } from "../../../hooks/useUserMedia"

export default function Tabs() {
    const {userId} = useParams() 
    const {user} = useContext(AuthContext)
    const {posts} = useUserPost(userId)
    const replies = useUserReplies(userId)
    const likes = useUserLikes(userId)
    const media = useUserMedia(userId)
    

    const tabs = user?.id == userId ?
    ["Posts","Replies","Media","Likes"]:
    ["Posts","Replies","Media"]

    const urls = user?.id == userId ?
    [`/user/${userId}`,`/user/${userId}/replies`,`/user/${userId}/media`,`/user/${userId}/likes`]:
    [`/user/${userId}`,`/user/${userId}/replies`,`/user/${userId}/media`]


    const tabPanels = user?.id == userId ?
    [posts,replies,media,likes]:
    [posts,replies,media]

    const errors = user?.id == userId ? 
    ["No posts to show","No replies to show","No media to show","No likes to show"] :
    ["No posts to show","No replies to show","No media to show"]

    if(!user){
        return
    }

    return(
        <TabLayout 
        tabs={tabs}
        urls={urls} 
        tabPanels={tabPanels}
        errors={errors}
        />
          

    )
}