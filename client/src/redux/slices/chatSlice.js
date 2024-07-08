import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chats: [],
    usersChatBasicInfo: [],
    notReadMessages: 0
}

const chatSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action)=>{
            state.chats = action.payload
        },
        setUsersBasicInfo: (state, action)=>{
            state.usersChatBasicInfo = action.payload
        },
        setNotReadMessages: (state, action)=>{
            state.notReadMessages = state.notReadMessages + action.payload
        },
        addNewchat: (state,action)=> {
            state.chats = [...state.chats, action.payload]
        }
    }
})

export const {setChats, setUsersBasicInfo, setNotReadMessages, addNewchat} = chatSlice.actions
export default chatSlice.reducer