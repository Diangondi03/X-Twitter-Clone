const db = require("../config/db")
const asyncHandler = require("../middleware/asyncHandler")


exports.replyToPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { userId,content } = req.body;

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await db.query(
        'INSERT INTO posts (user_id,content,image_url, reply_to_post_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId,content,image, postId]
    );

    res.status(201).json(result.rows[0]);

});

exports.getReplyCount = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const result = await db.query(
        'SELECT COUNT(*) FROM posts WHERE reply_to_post_id = $1',
        [postId]
    );

    res.status(200).json({ replyCount: result.rows[0].count });
});

exports.getReplies = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const result = await db.query(
        `SELECT posts.*, users.username,users.name, users.profile_image_url
         FROM posts 
         JOIN users ON posts.user_id = users.id 
         WHERE reply_to_post_id = $1 
         ORDER BY posts.created_at DESC`,
        [postId]
    );

    res.status(200).json(result.rows);
});