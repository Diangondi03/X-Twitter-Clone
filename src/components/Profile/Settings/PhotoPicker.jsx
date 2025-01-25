import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import ProfileImage from "../ProfileImage"
import axiosInstance from '../../../axiosConfig';

const PhotoPicker = () => {
    const { user } = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(file);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveImage = async () => {
        const formData = new FormData();
        formData.append('image', profileImage);
        const res = await axiosInstance.patch(`/users/${user?.id}/profileImageUrl`, formData,
            {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
        );

        setPreviewImage(null);
        window.location.reload();
    };

    return (
        <div style={{ display:"flex",flexDirection:"column",alignItems:"center",marginTop:"1rem" }}>
            

            <ProfileImage image_url={user?.profile_image_url} size="150px" preview={previewImage}/>
            
            <label htmlFor="fileInput" style={{ cursor: 'pointer', padding: '10px 20px', backgroundColor: '#1DA1F2', color: '#fff', borderRadius: '5px', display: 'inline-block', marginBottom: '10px',marginTop:"20px" }}>
                Choose Image
            </label>
            <input id="fileInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
            {previewImage && (
                <div>
                    <button onClick={handleSaveImage} style={{ padding: '10px 20px', backgroundColor: '#1DA1F2', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Save Image
                    </button>
                </div>
            )}
        </div>
    );
};

export default PhotoPicker;
