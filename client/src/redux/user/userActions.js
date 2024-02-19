
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

//variables
import { CREATE_USER } from './userActionTypes';

const URL = 'http://localhost:3001/speakit/'


export const createUser = createAsyncThunk(CREATE_USER, async(userData)=>{
    try {
        const response = await axios.post(`${URL}createuser`,userData)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
})



