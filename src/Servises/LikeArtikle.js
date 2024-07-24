import axios from 'axios'

const API_URL = 'https://blog.kata.academy/api/'

export const LikeArticle = async (slug, token) => {
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
    }
}

export const UnlikeArticle = async (slug, token) => {
    try {
        const response = await axios.delete(`${API_URL}/articles/${slug}/favorite`, {
            headers: {
                Authorization: `Token ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Ошибка при снятии лайка с статьи:', error)
    }
}
