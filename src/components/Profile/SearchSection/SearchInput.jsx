import { useTheme } from '@emotion/react';
import { IconButton } from '@mui/material';
import React, { useRef, useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5';
import { TiDelete } from 'react-icons/ti';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router-dom';
export const useStyles = createUseStyles((theme) => ({
    inputDiv: {
      position: "relative",
      marginTop: "0.5rem",
      paddingLeft:"1.5rem",
      paddingRight:"1.5rem",
      width:"100%"
    },
    searchInput: {
      border: "none",
      padding: "0.7rem 3rem",
      backgroundColor: theme?.palette?.background?.searchBar,
      borderRadius: "25px",
      width: "100%",
      color: theme?.palette?.color?.default,
      '&:focus': {
        outline: "rgb(120, 86, 255) solid 2px",
        '& + .searchIcon': {
          color: "rgb(120, 86, 255)"
        },
        '& ~ .deleteButton': {
          display: "flex",
        }
      },
    },
    searchIcon: {
      position: "absolute",
      top: "0.8rem",
      left: "2.5rem",
      fontSize: "1.2rem"
    },
    deleteButton: {
      display: 'none',
      position: "absolute", 
      right: "2rem", 
      top: "0.7rem", 
      padding: "0" 
    },
    deleteIcon: {
      color: "rgb(120, 86, 255)"
    }
  }));

const SearchInput = ({searchValue}) => {
    
    const theme = useTheme();
    const styles = useStyles({ theme });
    const [search, setSearch] = useState(searchValue || '');
    const inputRef = useRef(null);
    const navigate = useNavigate()

    const handleSearch = (e) => {
      e.preventDefault()
      if(search.length === 0) return;
      navigate(`/search?q=${search}&type=top`);
    };

    const handleInput = (e) => {
      setSearch(e.target.value);
    };
  
    const handleDelete = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setSearch('');
      if (inputRef.current) {
        inputRef.current.focus(); // Set focus back to the input field
      }
    };

    return (
        <div className={styles.inputDiv}>
          <form onSubmit={handleSearch}>

            <input
            ref={inputRef} // Attach the ref to the input field
            placeholder='Search'
            className={styles.searchInput}
            value={search}
            onChange={handleInput}
            />
            </form>

            <IoSearchOutline className={`${styles.searchIcon} searchIcon`} />
            
            <IconButton
            className={`${styles.deleteButton} deleteButton`}
            style={{display: search.length==0 ? "none" : "flex" }}
            onMouseDown={handleDelete}
            >
            <TiDelete className={`${styles.deleteIcon} deleteIcon`} />
            </IconButton>
        </div>
    )
}

export default SearchInput