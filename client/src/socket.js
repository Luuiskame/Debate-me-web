import io from 'socket.io-client'
const URL = "http://localhost:3001/"

export const socket = io(URL, {
    autoConnect: false,
    auth: {
        serverOffset: 0,
        chatId: 0,
        page: 1,
        limit: 15
    }
})

