const {Followers, User} = require('../../db')

async function folloUser({userWhosFollowingId, userToFollowId}) {
    try {
        const userToFollow = await User.findByPk(userToFollowId)
        if(!userToFollow) return {succes: false, error: 'userToFollow does not exist' }

        // check if user is already following(prevent duplicate follows)
        const existingFollow = await Followers.findOne({
            where: {
                userWhosFollowingId,
                userId: userToFollowId
            }
        })

        if(existingFollow) return {success: false, error: 'you already follow this person'}

        const newFollow = await Followers.create({
            userId: userToFollowId,
            userWhosFollowingId
        })

        if(newFollow) return {success: true, message: 'user followed succesfully', followerId: userWhosFollowingId}

        if(!newFollow) return {succes: false, error: 'something unexpected happened when following this user'}
    
    } catch (error) {
        console.log('error following this user', error)
        return {success: false, message: 'Failed to follow user'}
    }
}

module.exports = {
    folloUser
}