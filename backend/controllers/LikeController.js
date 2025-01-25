const db = require("../config/db");
const asyncHandler = require("../middleware/asyncHandler")

exports.likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const result = await db.query(
    'INSERT INTO likes (post_id, user_id) VALUES ($1, $2) ON CONFLICT (post_id, user_id) DO NOTHING RETURNING *',
    [postId, userId]
  );

  if (result.rowCount > 0) {
    res.status(200).json({ message: 'Post liked successfully' });
  } else {
    res.status(200).json({ message: 'Post already liked' });
  }
});

exports.unlikePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  const result = await db.query(
    'DELETE FROM likes WHERE post_id = $1 AND user_id = $2 RETURNING *',
    [postId, userId]
  );

  if (result.rowCount > 0) {
    res.status(200).json({ message: 'Post unliked successfully' });
  } else {
    res.status(200).json({ message: 'Post was not liked' });
  }
});

exports.isLiked = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query;

  const result = await db.query(
    'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
    [postId, userId]
  );

  if (result.rowCount > 0) {
    res.status(200).json({ liked: true });
  } else {
    res.status(200).json({ liked: false });
  }
});

exports.likeCount = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const result = await db.query(
    'SELECT COUNT(*) FROM likes WHERE post_id = $1',
    [postId]
  );

  res.status(200).json({ likeCount: parseInt(result.rows[0].count, 10) });
});
