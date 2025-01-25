import React from 'react'
import NormalPost from './NormalPost'
import UnquotedRepost from './UnquotedRepost'
import QuotedRepost from './QuotedRepost'
import { useStyles } from './postStyles'
import { useTheme } from '@emotion/react'
import { Card, CardContent, Typography } from '@mui/material'
import PostButtons from './Buttons/PostButtons'
import { FaRetweet } from 'react-icons/fa6'
import MoreButton from './Buttons/MoreButton'
import { useNavigate } from 'react-router-dom'

const Post = ({post}) => {
  const theme = useTheme()
  const styles = useStyles({theme})
  const navigate = useNavigate()

  const goToProfile = (e)=>{
    e.stopPropagation()
    navigate(`/user/${post.user_id}`)
  }

  return (
    <Card className={styles.post}>
      {post.repost_id && !post.content &&
      <div className={styles.repostIndicator} onClick={goToProfile}>
                    
        <FaRetweet className={styles.repostIcon}/>
        <Typography className={styles.repostText}>
          {post.name} reposted
        </Typography>
      </div>
      }

    <CardContent sx={{
      paddingBottom:"5px !important",
      paddingTop:(post.repost_id && !post.content) ? "0px !important" : ""
    }}>


      <MoreButton postId={(post.repost_id && !post.content) ? post.repost_id : post.id}/>

      <div  onClick={(e)=>{
      navigate(`/post/${(post.repost_id && !post.content) ? post.repost_id : post.id}`)
      }}>

    {!post.repost_id && <NormalPost post={post}/>}
    {post.repost_id && !post.content &&  <UnquotedRepost post={post}/> }
    {post.repost_id && post.content &&  <QuotedRepost post={post}/> }
      
      </div>

      <PostButtons postId={(post.repost_id && !post.content) ? post.repost_id : post.id}/>
    </CardContent>
  </Card>

  )
}

export default Post