const {Followers, User} = require('../db')

const getFollowers = async (req,res) => {
    const {userId} = req.body

    try {
        if(!userId) return res.status(404).send("we need the user id")
        const user = await User.findByPk(userId, {
            include: [
              {
                model: User,
                as: 'userFollowers',
                attributes: ['name', 'username', 'profilePicture', ], // Puedes ajustar los atributos que quieras retornar
                through: { attributes: [] } // No incluir los atributos de la tabla de unión
              }
            ]
          });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          // Retornar los seguidores del usuario
          const followers = user.userFollowers;
          return res.status(200).json({ followers });
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error})
    }
}

module.exports = getFollowers