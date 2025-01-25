const db = require("../config/db");
const asyncHandler = require("../middleware/asyncHandler");

const postFields = `
  p.id,
  p.content,
  p.created_at,
  p.image_url,
  u.id AS user_id,
  u.username,
  u.name,
  u.profile_image_url,
  rp.id AS repost_id,
  rp.content AS repost_content,
  ru.id AS repost_user_id,
  ru.username AS repost_username,
  ru.name AS repost_name,
  ru.profile_image_url AS repost_profile_image_url,
  rp.created_at AS repost_created_at,
  rp.image_url AS repost_image_url
`;

exports.createPost = asyncHandler(async (req, res) => {
  const { userId, content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  const result = await db.query(
    'INSERT INTO posts (user_id, content, image_url) VALUES ($1, $2, $3) RETURNING *',
    [userId, content, image]
  );
  res.status(201).json(result.rows[0]);
});

exports.getAllPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
  const offset = (page - 1) * limit;

  const result = await db.query(
    `SELECT 
    ${postFields}
    FROM 
    posts p
    LEFT JOIN 
    posts rp ON p.repost_id = rp.id
    LEFT JOIN 
    users u ON p.user_id = u.id
    LEFT JOIN 
    users ru ON rp.user_id = ru.id
    ORDER BY 
    p.created_at DESC
    LIMIT $1 OFFSET $2;`,
    [parseInt(limit), parseInt(offset)]
  );

  res.status(200).json(result.rows);
});

exports.getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const result = await db.query(
    `SELECT 
    ${postFields},
    u.profile_image_url,
    ru.profile_image_url AS repost_profile_image_url
    FROM 
    posts p
    LEFT JOIN 
    posts rp ON p.repost_id = rp.id
    LEFT JOIN 
    users u ON p.user_id = u.id
    LEFT JOIN 
    users ru ON rp.user_id = ru.id
    WHERE p.id = $1
    ORDER BY 
    p.created_at DESC;
  `, [postId]);
  
  if (result.rows.length > 0) {
    res.status(200).json(result.rows[0]);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  let query = 'UPDATE posts SET content = $1';
  const values = [content, postId];

  if (image) {
    query += ', image_url = $2';
    values.splice(1, 0, image);
  }

  query += ' WHERE id = $' + (values.length) + ' RETURNING *';

  const result = await db.query(query, values);
  res.status(200).json(result.rows[0]);
});

exports.deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  await db.query('DELETE FROM posts WHERE id = $1', [postId]);
  res.status(200).json({ message: 'Post deleted successfully' });
});
