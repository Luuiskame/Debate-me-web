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
      return res.status(404).json({ message: 'user not found' });
    }

    const userChats = user.Chats.map(chat => {
      const lastMessage = chat.Messages.length > 0 ? chat.Messages[0] : null;
      return {
        id: chat.id,
        lastMessage,
      };
    });

    return res.status(200).json(userChats);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUserChats;