const db = require("../config/db")
const asyncHandler = require("../middleware/asyncHandler")


exports.repost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;

  const result = await db.query(
    'INSERT INTO posts (user_id, content, repost_id) VALUES ($1, $2, $3) RETURNING *',
    [userId, content, postId]
  );

  res.json(result.rows[0]);
});

// API endpoint to undo a repost
exports.undoRepost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query;

  const result = await db.query(
    'DELETE FROM posts WHERE user_id = $1 AND repost_id = $2 RETURNING *',
    [userId, postId]
  );

  if (result.rowCount > 0) {
    res.json({ message: 'Post deleted successfully' });
  } else {
    res.status(404).json({ error: 'Post not found' });
  }
});

// API endpoint to check if a post is reposted by a user
exports.isReposted = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query;

  const result = await db.query(
    'SELECT posts.id FROM posts WHERE user_id = $1 AND repost_id = $2 AND LENGTH(content) = 0',
    [userId, postId]
  );
  res.json({ reposted: result.rowCount > 0 });
});

exports.repostCount = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const result = await db.query(
    'SELECT COUNT(*) FROM posts WHERE repost_id = $1',
    [postId]
  );

  res.status(200).json({ repostCount: parseInt(result.rows[0].count, 10) });
});
