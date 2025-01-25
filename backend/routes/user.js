const express = require('express');
const { getUser,getUserPosts, getUserSavedPosts, getUserLikes, setDarkMode, editUser,getFollowedUsersPosts, getUserPostImages, getUserReplies, updateUserProfileImage } = require('../controllers/UserController');
const { follow, unfollow, getFollowingCount, isFollowing, getFollowerCount } = require('../controllers/FollowController');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '../uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

router.get("/:userId",getUser)

router.get('/:userId/posts', getUserPosts);

router.get('/:userId/savedPosts',getUserSavedPosts)

router.get('/:userId/likes',getUserLikes)

router.post('/:userId/dark-mode',setDarkMode)

router.patch('/:userId',editUser)

router.patch('/:userId/profileImageUrl',upload.single('image'),updateUserProfileImage)

router.post('/:followedId/follow',follow)

router.delete('/:followedId/unfollow',unfollow)

router.get('/:userId/followerCount',getFollowerCount)

router.get('/:userId/followingCount',getFollowingCount)

router.get('/:followedId/isFollowing',isFollowing)

router.get('/:userId/followedPosts', getFollowedUsersPosts)

router.get('/:userId/media',getUserPostImages)

router.get('/:userId/replies',getUserReplies)

module.exports = router