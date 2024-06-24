const {User, Followers} = require('../db')

const verifyIfUserIsFollowing = async (req,res)=> {
    const {userWhosFollowingId, userToFollowId} = req.body

    try {
        if(!userWhosFollowingId || !userToFollowId) return res.status(500).json({error: 'missing one of the users id'})
        const isFollowing = await Followers.findOne({
            where: {
                userId: userToFollowId,
                followerId: userWhosFollowingId
            }
        })

        if(!isFollowing) return res.status(400).json({isFollowing: false})

        return res.status(200).json({isFollowing: true})

    } catch (error) {
        console.log('Error checking follow status: ', error)
        res.status(500).json({error: 'internal server error: ', error})
    }

}


module.exports = verifyIfUserIsFollowing