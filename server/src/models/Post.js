const {DataTypes} = require('sequelize')

module.exports = (sequelize)=>{
    sequelize.define('Post',{
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        image:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    })
}