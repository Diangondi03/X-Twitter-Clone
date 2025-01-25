import { useTheme } from '@emotion/react';
import { Box, Modal } from '@mui/material'
import React from 'react'
import { createUseStyles } from 'react-jss';
import { IoMdClose } from "react-icons/io";

const useStyles = createUseStyles((theme)=>({
    box:{
        position: 'absolute',
        top: '5%',
        left: '50%',
        borderRadius: '20px',
        borderColor: theme?.palette?.divider,
        borderWidth: '1px',
        transform: 'translate(-50%)',
        width: "50%",
        maxHeight:"90vh",
        overflowY:"auto",
        backgroundColor: theme?.palette?.background?.default,
        boxShadow: "24px 24px 48px rgba(0, 0, 0, 0.15)",
        padding: "2rem",
        paddingTop: "3rem",
        '@media (max-width: 1000px)': {
            width: "75%",
        },
        '@media (max-width: 600px)': {
            width: "100vw",
            height: "100vh",
            transform:"none",
            left: "0",
            top: "0",
            borderRadius: "0",
            maxHeight:"100vh",
        },

    },
    closeButton:{
      position:"absolute",
      top:"0.75rem",
      left:"0.75rem",
      fontSize:"1.75rem",
      cursor:"pointer"
    }
}))

const ModalLayout = ({children,open,handleClose}) => {
    const theme = useTheme()
    const classes = useStyles({theme})
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    componentsProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change the backdrop color here
          },
        },
      }}
    >
    <Box className={classes.box}>
        <IoMdClose className={classes.closeButton} onClick={handleClose}/>
        {children}
    </Box>
    </Modal>
  )
}

export default ModalLayout