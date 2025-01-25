const db = require("../config/db")
const asyncHandler = require("../middleware/asyncHandler")

exports.follow = asyncHandler(async(req,res)=>{
    const {followedId} = req.params
    const {followerId} = req.body

    const result = await db.query(
        'INSERT INTO follows (followed_id,follower_id) VALUES ($1,$2) RETURNING *',
        [followedId,followerId]
    )
    if (result.rowCount > 0) {
        res.status(200).json({ message: 'User followed successfully' });
        } else {
        res.status(200).json({ message: 'User already followed' });
        }

})

exports.unfollow = asyncHandler(async (req, res) => {
    const { followedId } = req.params;
    const { followerId } = req.query;

    const result = await db.query(
        'DELETE FROM follows WHERE followed_id = $1 AND follower_id = $2 RETURNING *',
        [followedId, followerId]
    );

    if (result.rowCount > 0) {
        res.status(200).json({ message: 'User unfollowed successfully' });
    } else {
        res.status(404).json({ message: 'Follow relationship not found' });
    }
});

exports.getFollowerCount = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const result = await db.query(
        'SELECT COUNT(*) FROM follows WHERE followed_id = $1',
        [userId]
    );

    res.status(200).json({ followerCount: result.rows[0].count });
});

exports.getFollowingCount = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const result = await db.query(
        'SELECT COUNT(*) FROM follows WHERE follower_id = $1',
        [userId]
    );

    res.status(200).json({ followingCount: result.rows[0].count });
});

exports.isFollowing = asyncHandler(async (req, res) => {
    const { followedId } = req.params;
    const { followerId } = req.query;

    const result = await db.query(
        'SELECT * FROM follows WHERE followed_id = $1 AND follower_id = $2',
        [followedId, followerId]
    );

    if (result.rowCount > 0) {
        res.status(200).json({ isFollowing: true });
    } else {
        res.status(200).json({ isFollowing: false });
    }
});