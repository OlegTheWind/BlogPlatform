import { createSlice } from '@reduxjs/toolkit'

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('auth')
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (err) {
        return undefined
    }
}

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('auth', serializedState)
    } catch (err) {
        console.error('Could not save state', err)
    }
}

const initialState = loadState() || {
    isAuthenticated: false,
    token: null,
    user: {
        username: '',
        email: '',
        image: '',
        token: '',
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.token = action.payload.token
            state.user = {
                ...action.payload.user,
                avatarUrl: action.payload.user.avatarUrl,
            }
            saveState(state)
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.token = null
            state.user = {
                username: '',
                email: '',
                image: '',
                token: '',
            }
            saveState(state)
        },
        updateUser: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            }
            saveState(state)
        },
    },
})

export const { login, logout, updateUser } = authSlice.actions
export default authSlice.reducer
