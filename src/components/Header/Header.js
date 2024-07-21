import React from 'react'
import { Col, Row, Button } from 'antd'

function Header() {
    return (
        <Row>
            <Col span={6} push={18}>
                <Button block>sign in</Button>
                <Button block>sign up</Button>
                <Button block>create article</Button>
                <Button block>Профиль</Button>
                <Button block>log out</Button>
            </Col>
            <Col span={18} pull={6}>
                <span>Real world Blog</span>
            </Col>
        </Row>
    )
}
export default Header
