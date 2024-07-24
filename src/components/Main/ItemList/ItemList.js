import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Avatar, Button, List, Space, Tag } from 'antd'
import { Link } from 'react-router-dom'

import { useGetArticlesQuery } from '../../../Servises/Servises'
import { LikeArticle, UnlikeArticle } from '../../../Servises/LikeArtikle'
import { setLikes, updateLike } from '../../../Servises/LikesSlice'
import style from './ItemList.module.css'
const IconText = ({ icon, text, onClick, favorited }) => (
    <Button
        onClick={onClick}
        style={{ borderColor: '#ffffff', boxShadow: '0 0 0 0', height: 17, borderRadius: 30, width: 17 }}
    >
        <Space>
            {favorited ? <HeartFilled style={{ color: 'red' }} /> : React.createElement(icon)}
            {text}
        </Space>
    </Button>
)

const ItemList = () => {
    const [page, setPage] = useState(1)
    const { data, error, isLoading, refetch } = useGetArticlesQuery({ page })
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const likes = useSelector((state) => state.likes)

    const handleLike = async (slug, favorited) => {
        if (isAuthenticated) {
            try {
                if (favorited) {
                    await UnlikeArticle(slug, user.token)
                    dispatch(updateLike({ slug, favorited: false }))
                } else {
                    await LikeArticle(slug, user.token)
                    dispatch(updateLike({ slug, favorited: true }))
                }
            } catch (error) {
                console.error('Ошибка при лайке/снятии лайка с статьи:', error)
            }
        } else {
            console.log('User is not authenticated')
        }
    }

    useEffect(() => {
        if (data) {
            data.articles.forEach((article) => {
                dispatch(
                    setLikes({
                        slug: article.slug,
                        favorited: article.favorited,
                        favoritesCount: article.favoritesCount,
                    }),
                )
            })
        }
    }, [data, dispatch])

    useEffect(() => {
        refetch()
    }, [page])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                current: page,
                onChange: (page) => {
                    setPage(page)
                },
                pageSize: 10,
                total: data.articlesCount,
                showSizeChanger: false,
                className: style.PaginationCenter,
            }}
            dataSource={data.articles}
            renderItem={(item) => (
                <List.Item key={item.slug} className={style.ListColor}>
                    <div className={style.list_item_meta}>
                        <div className={style.header_list}>
                            <Link to={`/articles/${item.slug}`} className={style.headerTitle}>
                                {item.title}
                            </Link>
                            <IconText
                                icon={HeartOutlined}
                                text={likes[item.slug]?.favoritesCount || item.favoritesCount}
                                onClick={() => handleLike(item.slug, likes[item.slug]?.favorited)}
                                favorited={likes[item.slug]?.favorited}
                                key="list-vertical-like-o"
                            />
                        </div>
                        <div className={style.tag_list}>
                            {item.tagList.map((tag, index) => {
                                if (tag) {
                                    return <Tag key={`${tag}-${index}`}>{tag}</Tag>
                                }
                            })}
                        </div>
                        <div className={`${style.content_list} ${style.itemText}`}>
                            <span>{item.description}</span>
                        </div>
                        <div className={style.user_info}>
                            <Avatar src={item.author.image} style={{ width: 46, height: 46 }} />
                            <div className={style.user_info_name_and_date}>
                                <span className={style.itemUsername}>{item.author.username}</span>
                                <span className={style.styleDateTitle}>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </List.Item>
            )}
        />
    )
}

export default ItemList
