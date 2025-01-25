const db = require("../config/db")
const asyncHandler = require("../middleware/asyncHandler")

// Endpoint to save a post
exports.savePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  if (!userId || !postId) {
    return res.status(400).send('user_id and post_id are required');
  }

  const query = `
    INSERT INTO bookmarks (user_id, post_id)
    VALUES ($1, $2)
    ON CONFLICT (user_id, post_id) DO NOTHING
    RETURNING *;
  `;
  const values = [userId, postId];

  const result = await db.query(query, values);
  if (result.rows.length > 0) {
    res.status(201).json(result.rows[0]);
  } else {
    res.status(200).send('Post already saved');
  }
});

// Endpoint to unsave a post
exports.unsavePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  if (!userId || !postId) {
    return res.status(400).send('user_id and post_id are required');
  }

  const query = `
    DELETE FROM bookmarks
    WHERE user_id = $1 AND post_id = $2
    RETURNING *;
  `;
  const values = [userId, postId];

  const result = await db.query(query, values);
  if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
  } else {
    res.status(404).send('Bookmark not found');
  }
});

exports.isSaved = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.query;

  const result = await db.query(
    'SELECT * FROM bookmarks WHERE post_id = $1 AND user_id = $2',
    [postId, userId]
  );

  if (result.rowCount > 0) {
    res.status(200).json({ saved: true });
  } else {
    res.status(200).json({ saved: false });
  }
});
