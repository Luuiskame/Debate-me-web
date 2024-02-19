const {Post} = require('../db')

const createPost = async(req,res)=>{
    try {
        const {description, image, userId} = req.body
        if(!description && !image) return res.status(400).send("you need at least either a description or image to create a post")
        if(!userId) return res.status(400).send("User id not recieved")

        const newPost = await Post.create({
            description,
            image,
            userId
        })

        return res.status(200).json(newPost)

    
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = createPost