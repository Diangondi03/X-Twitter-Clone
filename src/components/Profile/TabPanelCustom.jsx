import { TabPanel } from '@mui/lab'
import React, { lazy, Suspense } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useFeed } from '../../hooks/useFeed';
import { useTheme } from '@emotion/react';
const Post = lazy(() => import('./Post/Post'));
const ImageGrid = lazy(() => import('./ImageGrid'));
const PeopleList = lazy(() => import('./PeopleList'));

const TabPanelCustom = ({tabs,isSearch,index,panel}) => {
  const {feedPosts,loadMore,hasMore} = useFeed();
  const theme = useTheme()
  return (
        <TabPanel
          style={{ padding: "0" }}
          key={index}
          value={index + 1}
        >

          {panel===undefined && <h2 className="mt-2 text-center">No posts</h2>}

          {panel.length == 0 && isSearch &&
            <div className='text-center m-4'>
              <h3>No posts found</h3>
            </div>
          }
          {tabs[index] === 'Media' &&
            <Suspense fallback={<div>Loading Media...</div>}>
              <ImageGrid images={panel} />
            </Suspense>
          }
          {tabs[index] === 'People' &&
            <Suspense fallback={<div>Loading People...</div>}>
              <PeopleList people={panel} />
            </Suspense>
          }

          {tabs[index] !== 'Media' && tabs[index] !=='For you' && tabs[index] !== 'People' && panel && panel.map((post, index) => (
              <Post post={post} />
          ))}

          { tabs[index] == 'For you' &&

            <InfiniteScroll
              dataLength={feedPosts.length}
              next={loadMore}
              hasMore={hasMore}
              style={{borderTop:`1px solid ${theme.palette.divider}`}}
              loader={<h5 className="text-center">Loading...</h5>}
              endMessage={<p className='text-center'>No more posts</p>}
            >
              {feedPosts.map((post) => (
                <Post key={post.id} post={post} />
              ))}
            </InfiniteScroll>
              
          
          }
        </TabPanel>
  )
}

export default TabPanelCustom