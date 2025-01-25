import { Grid2, Typography } from '@mui/material';
import DarkModeButton from '../components/Profile/Settings/DarkModeButton';
import EditForm from '../components/Profile/Settings/EditForm';

import ArrowButton from '../components/Profile/ArrowButton';
import PhotoPicker from '../components/Profile/Settings/PhotoPicker';


export default function Settings() {

  return (
    <Grid2 sx={{pl:3,pr:3}}>
      <div className='d-flex align-items-center'>
        <ArrowButton/>
        <Typography variant="h5" sx={{m:2}}>Settings</Typography>

      </div>
      <Grid2 sx={{display:"flex"}}>
        <Typography variant="h5" sx={{mr:3}}>Dark Mode</Typography>
        <DarkModeButton/>
      </Grid2>

      <PhotoPicker/>

      <EditForm/>

    </Grid2>

  );
}
