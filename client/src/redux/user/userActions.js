
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const changeNameFunction = createAsyncThunk('changeName', async () => {
    try {
        const response = await axios('https://restcountries.com/v3.1/all')
        const data = response.data;
        console.log(data)

        return data
    } catch (error) {
        console.log(error)
        throw error
    }
});



