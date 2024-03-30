import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chats: [],
    usersChatBasicInfo: [],
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
        }
    }
})

export const {setChats, setUsersBasicInfo} = chatSlice.actions
export default chatSlice.reducer