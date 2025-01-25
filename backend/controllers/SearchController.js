const db = require("../config/db")
const asyncHandler = require("../middleware/asyncHandler")

const selectFields = `
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

exports.getTop = asyncHandler(async (req, res, next) => {
    const query = req.query.q;
    const results = await db.query(`
    SELECT 
        ${selectFields},
        COUNT(l.post_id) AS like_count
    FROM 
        posts p
    LEFT JOIN 
        users u ON p.user_id = u.id
    LEFT JOIN 
        posts rp ON p.repost_id = rp.id
    LEFT JOIN 
        users ru ON rp.user_id = ru.id
    LEFT JOIN 
        likes l ON p.id = l.post_id
    WHERE 
        p.content ILIKE $1
    GROUP BY 
        p.id, p.content, p.created_at, p.image_url, 
        u.id, u.username, u.name, 
        rp.id, rp.content, rp.created_at, rp.image_url, 
        ru.id, ru.username, ru.name
    ORDER BY 
        like_count DESC;
    `, [`%${query}%`]);
    res.status(200).json(results.rows)
});

exports.getLatest = asyncHandler(async (req, res, next) => {
    const query = req.query.q;
    const results = await db.query(`
        SELECT ${selectFields}
        FROM posts p
        LEFT JOIN users u ON p.user_id = u.id
        LEFT JOIN posts rp ON p.repost_id = rp.id
        LEFT JOIN users ru ON rp.user_id = ru.id
        WHERE p.content ILIKE $1
        ORDER BY p.created_at DESC
    `, [`%${query}%`]);
    res.status(200).json(results.rows);
});

exports.getPeople = asyncHandler(async (req, res, next) => {
    const query = req.query.q;

    const results = await db.query(`
        SELECT u.id, u.username, u.name, u.profile_image_url
        FROM users u
        WHERE u.username ILIKE $1 OR u.name ILIKE $2
    `, [`%${query}%`, `%${query}%`]);
    res.status(200).json(results.rows);
});

exports.getMedia = asyncHandler(async (req, res, next) => {
    const query = req.query.q;

    const results = await db.query(`
        SELECT p.image_url,p.id
        FROM posts p
        WHERE p.content ILIKE $1 AND p.image_url IS NOT NULL
        ORDER BY p.created_at DESC
    `, [`%${query}%`]);
    res.status(200).json(results.rows);
});