const {DataTypes} = require('sequelize')

module.exports = (sequelize)=>{
    sequelize.define('Chat',{
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        participants: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            defaultValue: [],
            allowNull: false
        }
    })
}