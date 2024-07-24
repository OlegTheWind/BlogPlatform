import { configureStore } from '@reduxjs/toolkit'

import { Servises } from '../Servises/Servises'
import authReducer from '../Servises/authSlice'
import likesReducer from '../Servises/LikesSlice'

const store = configureStore({
    reducer: {
        [Servises.reducerPath]: Servises.reducer,
        auth: authReducer,
        likes: likesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Servises.middleware),
})

export default store
