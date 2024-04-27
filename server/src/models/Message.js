const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Message", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    senderPicture: {
      type: DataTypes.STRING, // Assuming senderPicture is a string representing the URL or path
      allowNull: true, // It can be null if senderPicture is optional
    },

    senderName: {
      type: DataTypes.STRING, // Assuming senderName is a string
      allowNull: false,
    },

    senderUsername: {
      type: DataTypes.STRING, // Assuming senderUsername is a string
      allowNull: false,
    },

    chatId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    deliveryStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    readStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    attachments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },

    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });
};
