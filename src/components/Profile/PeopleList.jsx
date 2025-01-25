import React from 'react';
import Avatar from '@mui/material/Avatar';
import { IoPersonCircleSharp } from "react-icons/io5";
import { createUseStyles } from 'react-jss';
import { useTheme } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import ProfileImage from './ProfileImage';

const useStyles = createUseStyles((theme) => ({
    peopleList: {
        display: 'flex',
        flexDirection: 'column',
    },
    personProfile: {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        cursor: 'pointer',
    },
    personDetails: {
        marginLeft: '10px',
    },
    h3: {
        margin: '0',
        fontSize: '1.3rem',
        fontWeight: 'bold',
    },
    p: {
        margin: '0',
        color: theme.palette.text.secondary,
        fontSize: '14px',
    },

}))

const PeopleList = ({ people }) => {
    const theme = useTheme()
    const styles = useStyles({theme});
    const navigate = useNavigate()
    const handleClick = (id)=>{
        navigate(`/user/${id}`)
    }

    return (
        <div className={styles.peopleList}>
            {people.map((person) => (
                <div onClick={()=>{handleClick(person?.id)}} key={person.id} className={styles.personProfile}>
                    <ProfileImage image_url={person?.profile_image_url} alt={person?.name} />
                    <div className={styles.personDetails}>
                        <h2 className={styles.h3}>{person.name}</h2>
                        <p className={styles.p}>@{person.username}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};



export default PeopleList;