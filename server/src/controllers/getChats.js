const { User, Chat, Message } = require('../db');

const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Chat,
          include: [
            {
              model: Message,
              order: [['timestamp', 'ASC']],
              limit: 1,
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userChats = await Promise.all(user.Chats.map(async (chat) => {
      const lastMessage = chat.Messages.length > 0 ? chat.Messages[0] : null;
      if (lastMessage) {
        // Fetch the receiver's information for the last message
        const receiver = await User.findByPk(lastMessage.receiverId);
        return {
          id: chat.id,
          lastMessage: {
            id: lastMessage.id,
            content: lastMessage.content,
            timestamp: lastMessage.timestamp,
          },
          receiver: {
            id: receiver.id,
            username: receiver.username,
            name: receiver.name,
            profilePicture: receiver.profilePicture,
            isVip: receiver.isVip,
            isActive: receiver.isActive
            // Include other receiver info here as needed
          },
          sender: {
            id: lastMessage.senderId
          }
        };
      } else {
        return {
          id: chat.id,
          lastMessage: null,
        };
      }
    }));

    return res.status(200).json(userChats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUserChats;
