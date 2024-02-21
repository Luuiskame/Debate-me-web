const {DataTypes, UUIDV4} = require('sequelize')

module.exports = (sequelize)=>{
    sequelize.define('Message',{
        id:{
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        content:{
            type: DataTypes.TEXT,
            allowNull:false,
        },
        senderId:{
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: 'Users',
                key: 'id',
            },
        },
        receiverId:{
            type: DataTypes.UUID,
            allowNull: false,
            references:{
                model: 'Users',
                key: 'id',
            },
        },
        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    })
}
