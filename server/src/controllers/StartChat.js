const { User, Chat, Message } = require('../db');
const { Op } = require('sequelize');

const startChat = async (req, res) => {
    try {
        const { userId, participantId } = req.body;

        // Check if both users exist
        const bothUserExist = await User.findAll({
            where: {
                id: [userId, participantId]
            }
        });

        if (bothUserExist.length !== 2) {
            return res.status(400).send("A user doesn't exist");
        }

        // Check if a chat already exists between the two users
        let chat = await Chat.findOne({
            where: {
                participants: {
                    [Op.contains]: [userId, participantId]
                }
            }
        });

        let created = false;

        if (!chat) {
            // Create a new chat if it doesn't exist
            chat = await Chat.create({
                participants: [userId, participantId]
            });

            // Add users to the chat
            await chat.addUsers([userId, participantId]);

            // Set the created flag to true
            created = true;
        }

        // Get participants' info
        const participants = await User.findAll({
            where: {
                id: chat.participants
            },
            attributes: ['id', 'name', 'profilePicture', 'username']
        });

        // Get the last message in the chat, if any
        const lastMessage = await Message.findOne({
            where: {
                chatId: chat.id
            },
            order: [['createdAt', 'DESC']]
        });

        // Prepare the response
        const response = {
            id: chat.id,
            participantsInfo: participants,
            participantsIds: chat.participants,
            lastMessage: lastMessage || null,
            created: created  // Include the created flag
        };

        // Return the desired response
        return res.status(200).json(response);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = startChat;

