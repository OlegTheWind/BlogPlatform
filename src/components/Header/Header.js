import React from 'react'
import { Col, Row, Button, Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../../Servises/authSlice'
import defaultImage from '../../img/Rectangle.png'
import styles from './Header.module.css'

function Header() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Row className={styles.headerStyleHeight}>
            <Col span={7} push={17}>
                {!isAuthenticated ? (
                    <div className={styles.buttonList}>
                        <Link to="/sign-up" style={{ width: 100 }}>
                            <Button block style={{ width: 109, height: 51 }} className={styles.buttonGreen}>
                                sign up
                            </Button>
                        </Link>
                        <Link to="/sign-in" style={{ width: 100 }}>
                            <Button className={styles.button} style={{ width: 109, height: 51 }} block>
                                sign in
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className={styles.buttonList}>
                        <Button block className={styles.buttonLogOut} style={{ width: 109, height: 51 }}>
                            <Link to="/" onClick={handleLogout}>
                                log out
                            </Link>
                        </Button>
                        <Link to="/profile" className={styles.profileList} style={{ color: '#000000D9' }}>
                            <span className={styles.HeaderStyleName}>{user.username}</span>
                            <Avatar src={user.image || defaultImage} alt="avatar" className={styles.avatar} size={46} />
                        </Link>
                        <Button
                            block
                            className={`${styles.buttonGreen} ${styles.buttonSize}`}
                            style={{ width: 112, height: 31 }}
                        >
                            <Link to="/createNewItemList">create article</Link>
                        </Button>
                    </div>
                )}
            </Col>
            <Col span={17} pull={7} style={{ display: 'flex' }}>
                <Link to="/" className={styles.headerBlog}>
                    Real world Blog
                </Link>
            </Col>
        </Row>
    )
}
export default Header
