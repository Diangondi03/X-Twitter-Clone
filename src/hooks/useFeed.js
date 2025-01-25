// import axios from "axios";
// import { useEffect, useState } from "react";
// import axiosInstance from "../axiosConfig";

// export const useFeed = () =>{
//     const [feedPosts, setFeedPosts] = useState();
//     const [loading, setLoading] = useState(true);
  
//     const reloadFeed = async () => {
//       setLoading(!loading);
//     }
  
//     useEffect(() => {
//       const fetchFeed = async () => {
//         try {
//           const response = await axiosInstance.get('/posts');
//           setFeedPosts(response.data);
//         } catch (err) {
//           console.error('Error fetching feed:', err);
//         }
//       };
  
//       fetchFeed();
//     }, [loading]);
//     return {feedPosts,reloadFeed};
//   }

import { useEffect, useState } from "react";
import axiosInstance from "../axiosConfig";

export const useFeed = () => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchFeed = async (page, limit = 10) => {
    try {
      const response = await axiosInstance.get('/posts', {
        params: { page, limit },
      });

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setFeedPosts((prevPosts) => [...prevPosts, ...response.data]);
      }
    } catch (err) {
      console.error('Error fetching feed:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchFeed(page);
  }, [page]);

  return { feedPosts, loading, hasMore, loadMore };
};