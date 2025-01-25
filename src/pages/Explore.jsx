import React, { useRef, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, IconButton } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { IoIosMore } from 'react-icons/io';
import SearchSection from '../components/Profile/SearchSection/SearchSection';
import SearchInput from '../components/Profile/SearchSection/SearchInput';
import { useTheme } from '@emotion/react';

const trendingData = [
    { id: 1, category: 'Technology', topic: '#ReactJS', posts: '120K posts' },
    { id: 2, category: 'Sports', topic: '#Olympics2024', posts: '85K posts' },
    { id: 3, category: 'Entertainment', topic: '#Oscars', posts: '60K posts' },
    { id: 4, category: 'Politics', topic: '#Election2024', posts: '45K posts' },
    { id: 5, category: 'Music', topic: '#NewAlbum', posts: '30K posts' },
    { id: 6, category: 'Health', topic: '#Fitness', posts: '25K posts' },
    { id: 7, category: 'Travel', topic: '#Wanderlust', posts: '20K posts' },
    { id: 8, category: 'Food', topic: '#VeganRecipes', posts: '15K posts' },
    { id: 9, category: 'Fashion', topic: '#SummerTrends', posts: '10K posts' },
    { id: 10, category: 'Science', topic: '#SpaceX', posts: '5K posts' },
    { id: 11, category: 'Gaming', topic: '#E3Expo', posts: '50K posts' }
];

const Explore = () => {

  const theme = useTheme();

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', boxShadow: 3 }}>
      <SearchInput/>
      <Typography variant="h6" component="div" sx={{ my: 2,ml:2 }}>
        Trends for you
      </Typography>
      <List>
        {trendingData.map((trend) => (
          <div key={trend.id}>
            <ListItem alignItems="flex-start" button key={trend.id} style={{cursor:"pointer"}}>
              <ListItemText
                primary={
                  <Typography
                    sx={{ display: 'inline',fontWeight:'bold',fontSize:"1.1rem"}}
                    variant="body1"
                    color="text.primary"
                  >
                    {trend.category}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {trend.topic}
                    </Typography>
                    {" — " + trend.posts}
                  </>
                }
              />
            <IconButton edge="end" aria-label="more">
                <IoIosMore style={{color:"rgb(139, 152, 165)"}}/>
            </IconButton>
            </ListItem>
          </div>
        ))}
      </List>
    </Box>
  );
};

export default Explore;