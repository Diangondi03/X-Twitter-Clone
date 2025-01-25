import { Button, Popover } from '@mui/material';
import React, { useState } from 'react'

import { createUseStyles } from 'react-jss';
import { useTheme } from '@emotion/react';


const useStyles = createUseStyles((theme)=>(
  {
    button:{

      color: theme.palette.color.default,
      padding: '0.7rem',
      textTransform: 'capitalize',	
      fontSize: '1rem',
      fontWeight: '700',
      backgroundColor: theme.palette.background.default,
      borderRadius: '0px',
      cursor: 'pointer',
      '&:hover':{
        backgroundColor: theme.palette.background.hoverPost,
      }
    },
    icon:{
      fontSize: '1.5rem',
      marginRight: '0.5rem'
    }
  }
))

const PopoverLayout = ({anchorEl,handleClose,buttons}) => {
    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;
    const theme = useTheme()
    const styles = useStyles({theme})

  return (
    <>
      <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      slotProps={{
        paper: {
          style: {
            boxShadow: '0 0 3px 1px rgba(255,255,255,0.4)',
            borderRadius: '10px',
            border: `1px solid ${theme.palette.divider}`,
          },
        },
      }}
      disableScrollLock={true}
      
      >
      <div className="d-flex justify-content-around flex-column" >
        {buttons.map((button,index)=>{
            const Icon = button.icon
            return(
                <div 
                className={styles.button}
                key={index}
                style={{color:button.text=="Delete Post" ? "red" : ""}}
                onClick={(e)=>{
                    e.stopPropagation()
                    button.action()
                    handleClose(e)
                }}>
                    <Icon className={styles.icon}/>
                    {button.text}
                </div>
            )
        })}

      </div>
    </Popover>
  </>
  )
}

export default PopoverLayout