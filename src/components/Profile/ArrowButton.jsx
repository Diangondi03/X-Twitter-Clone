import { ArrowBack } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ArrowButton = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(-1)
    }
    return (
        <Tooltip title="Back">

            <IconButton onClick={handleClick}>
                <ArrowBack/>
            </IconButton>
        </Tooltip>
    )
}

export default ArrowButton