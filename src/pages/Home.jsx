// Home.js
import React, { useEffect, useState } from 'react';
import { Grid2 } from '@mui/material';
import { useFeed } from '../hooks/useFeed';
import PostForm from '../components/Profile/PostForms/PostForm';
import TabLayout from '../components/Profile/TabLayout';
import { useFollowedFeed } from '../hooks/useFollowedFeed';
import { useTheme } from '@emotion/react';


const Home = () => {

  const {feedPosts} = useFeed();
  const followedFeed = useFollowedFeed()
  const [posts, setPosts] = useState(null);
  const [followedPosts, setFollowedPosts] = useState(null);
  const theme = useTheme()

  useEffect(() => {
    feedPosts && setPosts(feedPosts);
    followedFeed && setFollowedPosts(followedFeed);
  },[feedPosts,followedFeed])

  const tabs = ["For you","Following"];

  const urls = ["/home","/home/following"]

  const tabPanels = [posts,followedPosts];

  const errors = ["No posts to show","No followed posts to show"];

  const extra = 
  <div style={{paddingBottom:"1rem"}}>
    <PostForm/>
  </div>

  return (
          <Grid2 sx={{minHeight:"100vh"}}>
 
            <TabLayout 
            tabs={tabs} 
            urls={urls}
            tabPanels={tabPanels}
            extra={extra}
            errors={errors}
            />
          </Grid2>
  );
};

export default Home;