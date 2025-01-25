const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const postController = require("../controllers/PostController")
const likeController = require("../controllers/LikeController")
const repostController = require("../controllers/RepostController")
const bookmarkController = require("../controllers/BookmarkController");
const replyController = require("../controllers/ReplyController");



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

router.post('/',upload.single("image"), postController.createPost);
router.get('/', postController.getAllPosts);
router.get("/:postId",postController.getPost)
router.put('/:postId',upload.single("image"), postController.updatePost);
router.delete('/:postId', postController.deletePost);

router.post("/:postId/like",likeController.likePost);
router.post("/:postId/unlike",likeController.unlikePost);
router.get("/:postId/isLiked",likeController.isLiked);
router.get("/:postId/likeCount",likeController.likeCount);

router.post("/:postId/repost",repostController.repost);
router.delete("/:postId/undoRepost",repostController.undoRepost);
router.get("/:postId/isReposted",repostController.isReposted);
router.get("/:postId/repostCount",repostController.repostCount);

router.post("/:postId/save",bookmarkController.savePost)
router.post("/:postId/unsave",bookmarkController.unsavePost)
router.get("/:postId/isSaved",bookmarkController.isSaved)

router.post('/:postId/reply',upload.single("image"),replyController.replyToPost)
router.get('/:postId/replyCount',replyController.getReplyCount)
router.get('/:postId/replies',replyController.getReplies)

module.exports = router;
