import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_URL = 'https://blog.kata.academy/api/'

export const likeArticle = createAsyncThunk('articles/likeArticle', async ({ slug, token }, { rejectWithValue }) => {
    try {
        const response = await axios.post(
            `${API_URL}/articles/${slug}/favorite`,
            {},
            {
                headers: {
                    Authorization: `Token ${token}`,
                },
            },
        )
        return response.data
    } catch (error) {
        console.error('Ошибка при лайке статьи:', error)
        return rejectWithValue(error.response.data)
    }
})
