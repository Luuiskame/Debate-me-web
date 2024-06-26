const {Followers, User} = require('../db')

const unfollowUser = async (req,res)=> {
    const {userWhosFollowingId, userToFollowId} = req.body

    try {
        if(!userWhosFollowingId || !userToFollowId) return res.status(500).json({error: 'missing one of the users id'})

            const result = await Followers.destroy({
                where: {
                    userId: userToFollowId,
                    followerId: userWhosFollowingId
                }
            })

            if(!result) return res.status(404).json(`error when unfollowing user`)

                return res.status(200).json({unfollowed: true})
        
    } catch (error) {
        console.log(`something unexpected happened when executing unfollowUser function: ${error}`)
        
        res.status(500).json(`error on the server side: ${error}`)
    }
}

module.exports = unfollowUser