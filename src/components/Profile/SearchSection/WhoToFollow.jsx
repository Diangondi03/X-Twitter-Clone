import React from 'react';
import { Box, Typography, List, ListItem, ListItemAvatar, ListItemText, Avatar, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
  container:{
    width: '90%',
    marginLeft: '5%',
    border: `1px solid ${theme?.palette?.divider}`,
    padding:"0px"
  },
  header:{
     fontWeight:"bold",
     padding:"1rem"
  },
  listItem:{
    display:"flex",
    alignItems:"center",
    cursor:"pointer",
    '&:hover':{
      backgroundColor: theme?.palette?.background?.hoverPost
    }
  },
  button:{
    textTransform:"capitalize",
    fontWeight:"bold"
  }

}))

const whoToFollowData = [
  { id: 1, name: 'John Doe', handle: '@johndoe', avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Jane Smith', handle: '@janesmith', avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Alice Johnson', handle: '@alicejohnson', avatar: 'https://via.placeholder.com/40' },
];

const WhoToFollow = () => {
    const theme = useTheme()
    const styles = useStyles({theme})

  return (
    <Box className={styles.container} sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 3,p:2,mt:2}}>
      <Typography variant="h6" component="div" className={styles.header}>
        Who to follow
      </Typography>
      <List>
        {whoToFollowData.map((user) => (
          <ListItem key={user.id} alignItems="flex-start" className={styles.listItem}>
            <ListItemAvatar>
              <Avatar alt={user.name} src={user.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={user.name}
              secondary={user.handle}
            />
            <Button variant="contained" color="primary" size="small" className={styles.button} sx={{borderRadius:3,px:2,py:0.5}}>
              Follow
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default WhoToFollow;