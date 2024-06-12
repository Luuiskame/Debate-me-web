const { User, Followers } = require('../../db'); // Assuming you have a model named "userFollowers"

async function followUserFn({ userWhosFollowingId, userToFollowId }) {
    try {
        // Find the user to follow
        const userToFollow = await User.findByPk(userToFollowId);
        if (!userToFollow) 
            return { success: false, error: 'userToFollow does not exist' };

        // Check if user is already following (prevent duplicate follows)
        const existingFollow = await Followers.findOne({
            where: {
                userId: userWhosFollowingId,
                followerId: userToFollowId
            }
        });

        if (existingFollow) 
            return { success: false, error: 'You already follow this person' };

        // Create a new follow relationship
        await Followers.create({
            userId: userWhosFollowingId,
            followerId: userToFollowId
        });

        return { success: true, message: 'User followed successfully', followerId: userWhosFollowingId };
    } catch (error) {
        console.error('Error following this user', error);
        return { success: false, message: 'Failed to follow user' };
    }
}

module.exports = {
    followUserFn
};
