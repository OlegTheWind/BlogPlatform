import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './components/Header/Header'
import Main from './components/Main/Main'
import SignIn from './components/Form/SignIn/SignIn'
import SignUp from './components/Form/SignUp/SignUp'
import EditProfile from './components/Form/EditProfile/EditProfile'
import EditItemList from './components/Form/EditItemList/EditItemList'
import CreateNewItemList from './components/Form/CreateNewItemList/CreateNewItemList'
import Article from './components/Main/ItemList/ItemListFull/ItemListFull'

function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" replace element={<Main />} />
                <Route path="/articles" replace element={<Main />} />
                <Route path="/articles/:slug" replace element={<Article />} />
                <Route path="/sign-in" replace element={<SignIn />} />
                <Route path="/sign-up" replace element={<SignUp />} />
                <Route
                    path="/profile"
                    replace
                    element={isAuthenticated ? <EditProfile /> : <Navigate to={'/sign-in'} />}
                />
                <Route
                    path="/editItemList/:slug"
                    replace
                    element={isAuthenticated ? <EditItemList /> : <Navigate to={'/sign-in'} />}
                />
                <Route
                    path="/createNewItemList"
                    replace
                    element={isAuthenticated ? <CreateNewItemList /> : <Navigate to={'/sign-in'} />}
                />
                <Route path="/article-added-success" element={<div>Article successfully added!</div>} />
            </Routes>
        </div>
    )
}

export default App
