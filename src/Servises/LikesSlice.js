import { createSlice } from '@reduxjs/toolkit'

const loadLikesFromLocalStorage = () => {
    try {
        const likes = localStorage.getItem('likes')
        return likes ? JSON.parse(likes) : {}
    } catch (e) {
        console.error('Failed to load likes from local storage', e)
        return {}
    }
}

const saveLikesToLocalStorage = (likes) => {
    try {
        localStorage.setItem('likes', JSON.stringify(likes))
    } catch (e) {
        console.error('Failed to save likes to local storage', e)
    }
}

const initialState = loadLikesFromLocalStorage()

const likesSlice = createSlice({
    name: 'likes',
    initialState,
    reducers: {
        setLikes(state, action) {
            const { slug, favorited, favoritesCount } = action.payload
            state[slug] = { favorited, favoritesCount }
            saveLikesToLocalStorage(state)
        },
        updateLike(state, action) {
            const { slug, favorited } = action.payload
            if (state[slug]) {
                state[slug].favorited = favorited
                state[slug].favoritesCount += favorited ? 1 : -1
                saveLikesToLocalStorage(state)
            }
        },
    },
})

export const { setLikes, updateLike } = likesSlice.actions
export default likesSlice.reducer
