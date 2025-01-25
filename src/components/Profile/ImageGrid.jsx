import React from 'react';
import { Box,Grid2 } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ImageGrid = ({images}) => {

  const navigate = useNavigate()
  const handleClick = (id)=>{
    navigate(`/post/${id}`)
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid2 container>
        {images.map((image,index) => (
          <Grid2 item size={{xs:4,lg:3}} key={index}>
            <Box
              component="img"
              onClick={()=>{handleClick(image?.id)}}
              sx={{
                width: '100%',
                aspectRatio: '1 / 1',
                display: 'block',
                border:"1px solid transparent",
                cursor:"pointer"
              }}
              src={`http://localhost:5000${image?.image_url}`}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ImageGrid;