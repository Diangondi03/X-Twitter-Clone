import { useTheme } from '@emotion/react';
import { Box, IconButton } from '@mui/material';
import { MdMoreHoriz } from "react-icons/md";
import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles((theme) => ({
    container: {
        padding: '0px',
        width: '90%',
        marginLeft: '5%',
        border: `1px solid ${theme?.palette?.divider}`,
    },
    header: {
        fontWeight: 'bold',
        marginBottom: '10px',
        padding: '10px',
    },
    trendContainer: {
        padding: '10px',
        marginBottom: '10px',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme?.palette?.background?.hoverPost
        }
    },
    postCount: {
        fontSize: '14px',
        color: '#657786',
        paddingLeft:"10px",
    },
    moreButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: 'rgb(139, 152, 165)',
        '&:hover': {
            backgroundColor:'rgba(143, 218, 220, 0.06)',
            '& svg': {
                color: 'lightblue',
            }
        }
    },
}));

const WhatsHappening = () => {
    const theme = useTheme();
    const classes = useStyles({theme});
    const [trends] = useState([
        { name: 'AO 2025', amount: "500k" },
        { name: 'Djokovic', amount: "120k" },
        { name: 'Squid Games', amount: "200k" },
    ]);

    return (
        <Box className={classes.container} sx={{ bgcolor: 'background.paper',borderRadius:3,boxShadow: 3 ,mt:2,p:2}}>
            <h5 className={classes.header} style={{marginTop:"1rem"}}>What's Happening</h5>
            
            {trends.map((trend, index) => (
                <div key={index} className={classes.trendContainer}>
                    <h6 className={classes.header}>{trend.name}</h6>
                    <div className={classes.postCount}>{trend.amount} posts</div>
                    <IconButton className={classes.moreButton}>
                        <MdMoreHoriz />
                    </IconButton>
                </div>
            ))}
        </Box>
    );
};

export default WhatsHappening;