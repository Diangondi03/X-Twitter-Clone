const db = require("../config/db")
const bcrypt = require('bcrypt');
const asyncHandler = require("../middleware/asyncHandler")

const postColumns = `
  p.*, 
  u.username,
  u.name,
  u.profile_image_url,
  rp.id AS repost_id,
  rp.content AS repost_content,
  ru.username AS repost_username,
  ru.id AS repost_user_id,
  ru.profile_image_url AS repost_profile_image_url,
  ru.name AS repost_name,
  rp.created_at AS repost_created_at,
  rp.image_url AS repost_image_url
`;

exports.getUser = asyncHandler(async(req,res)=>{
    const { userId } = req.params;

    const userResult = await db.query('SELECT * FROM users WHERE id = $1',[userId])
    if (userResult.rows.length > 0) {
        res.status(200).json(userResult.rows[0]);
    } 
    else {
        res.status(404).json({ message: 'Tweet not found' });
    }

})

exports.getUserPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const result = await db.query(
    `SELECT ${postColumns}
      FROM posts p 
      JOIN users u ON p.user_id = u.id
      LEFT JOIN 
        posts rp ON p.repost_id = rp.id
      LEFT JOIN 
        users ru ON rp.user_id = ru.id
      WHERE p.user_id = $1
      ORDER BY p.created_at DESC`,
    [userId]
  );
  res.status(200).json(result.rows);

})

exports.getUserSavedPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await db.query(
      `SELECT ${postColumns}
      FROM bookmarks b
      JOIN posts p ON b.post_id = p.id
      JOIN users u ON p.user_id = u.id
      LEFT JOIN 
        posts rp ON p.repost_id = rp.id
      LEFT JOIN 
        users ru ON rp.user_id = ru.id
      WHERE b.user_id = $1
      ORDER BY b.saved_date DESC`,
      [userId]
  );


  res.status(200).json(result.rows);

})

exports.getUserLikes = asyncHandler(async (req, res) => {

  const { userId } = req.params;

  const result = await db.query(
      `SELECT ${postColumns}
      FROM likes l
      JOIN posts p ON l.post_id = p.id
      JOIN users u ON p.user_id = u.id
      LEFT JOIN 
        posts rp ON p.repost_id = rp.id
      LEFT JOIN 
        users ru ON rp.user_id = ru.id
      WHERE l.user_id = $1
      ORDER BY l.liked_date DESC`,
      [userId]
  );

  res.status(200).json(result.rows);

})

exports.setDarkMode =  asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Fetch the current dark_mode value
  const fetchResult = await db.query('SELECT dark_mode FROM users WHERE id = $1', [userId]);

  if (fetchResult.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  const currentDarkMode = fetchResult.rows[0].dark_mode;

  // Toggle the dark_mode value
  const newDarkMode = !currentDarkMode;

  // Update the dark_mode value in the database
  const updateResult = await db.query(
    'UPDATE users SET dark_mode = $1 WHERE id = $2 RETURNING *',
    [newDarkMode, userId]
  );

  res.status(200).json(updateResult.rows[0]);

})
exports.updateUserProfileImage = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const image = req.file ? `/uploads/${req.file.filename}` : null;


  const result = await db.query(
    `UPDATE users
     SET profile_image_url = $1
     WHERE id = $2
     RETURNING *`,
    [image, userId]
  );

  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.status(200).json(result.rows[0]);
});

exports.editUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { name, username, email, password } = req.body;
  const password_hash = await bcrypt.hash(password, 10);

  const result = await db.query(
    `UPDATE users
     SET name = $1, username = $2, email = $3, password_hash = $4
     WHERE id = $5
     RETURNING *`,
    [name, username, email, password_hash, userId]
  );

  res.status(200).json(result.rows[0]);
});

exports.getFollowedUsersPosts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await db.query(
    `SELECT ${postColumns}
      FROM posts p 
      JOIN users u ON p.user_id = u.id
      LEFT JOIN 
        posts rp ON p.repost_id = rp.id
      LEFT JOIN 
        users ru ON rp.user_id = ru.id
      WHERE p.user_id IN (
        SELECT followed_id 
        FROM follows 
        WHERE follower_id = $1
      )
      ORDER BY p.created_at DESC`,
    [userId]
  );
  res.status(200).json(result.rows);
});

exports.getUserPostImages = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await db.query(
    `SELECT 
      p.image_url, p.id
      FROM posts p 
      WHERE p.user_id = $1 AND p.image_url IS NOT NULL
      ORDER BY p.created_at DESC`,
    [userId]
  );

  res.status(200).json(result.rows);
});

exports.getUserReplies = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const result = await db.query(
    `SELECT 
      p.*, 
      u.username,
      u.name,
      u.profile_image_url
      FROM posts p 
      JOIN users u ON p.user_id = u.id
      WHERE p.user_id = $1 AND p.reply_to_post_id IS NOT NULL
      ORDER BY p.created_at DESC`,
    [userId]
  );

  res.status(200).json(result.rows);
});
