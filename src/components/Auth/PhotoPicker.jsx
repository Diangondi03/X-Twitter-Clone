import React, { useContext, useState } from 'react';
import ProfileImage from '../Profile/ProfileImage';

const PhotoPicker = ({setImage}) => {
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(file);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };



    return (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",marginTop:"1rem" }}>
            

            <ProfileImage size="150px" preview={previewImage}/>
            
            <label htmlFor="fileInput" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#1DA1F2', color: '#fff', borderRadius: '5px', display: 'inline-block', marginBottom: '10px',marginTop:"20px" }}>
                Choose Image
            </label>
            <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            
        </div>
    );
};

export default PhotoPicker;
