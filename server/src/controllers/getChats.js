const { User, Chat, Message } = require('../db');

const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, {
      include: [
        {
          model: Chat,
          through: { attributes: [] }
        }
      ],
      attributes: []
    });

    if (!user) return res.status(400).send('User ID is not valid');

    // Construct an array of objects containing chat ID, participants, and participant IDs
    const chatInfo = await Promise.all(user.Chats.map(async (chat) => {
      const filteredParticipantIds = chat.participants.filter(id => id !== userId);
      const participants = await User.findAll({
        where: {
          id: filteredParticipantIds
        }
      });
      return {
        id: chat.id,
        participantsInfo: [...participants],
        participantsIds: chat.participants
      };
    }));

    res.status(200).json(chatInfo);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getUserChats;


