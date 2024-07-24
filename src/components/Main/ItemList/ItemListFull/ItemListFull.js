import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, Button, Modal, Space, Tag } from 'antd'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'

import { useGetArticleQuery, useDeleteArticleMutation } from '../../../../Servises/Servises'
import { LikeArticle, UnlikeArticle } from '../../../../Servises/LikeArtikle'
import { setLikes, updateLike } from '../../../../Servises/LikesSlice'
import style from './ItemListFull.module.css'

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

const ItemListFull = () => {
    const { slug } = useParams()
    const { data, error, isLoading } = useGetArticleQuery(slug)
    const [deleteArticle] = useDeleteArticleMutation()
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    const dispatch = useDispatch()
    const likes = useSelector((state) => state.likes)
    const [isModalVisible, setIsModalVisible] = useState(false)

    useEffect(() => {
        if (data) {
            dispatch(
                setLikes({
                    slug: data.article.slug,
                    favorited: data.article.favorited,
                    favoritesCount: data.article.favoritesCount,
                }),
            )
        }
    }, [data, dispatch])

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    const { title, description, body, tagList, author, createdAt } = data.article

    const handleDelete = async () => {
        try {
            await deleteArticle({ slug, token: user.token })
            navigate('/articles')
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    const showModal = () => {
        setIsModalVisible(true)
    }

    const showModalCancelled = () => {
        setIsModalVisible(false)
    }

    const handleLike = async (slug) => {
        if (isAuthenticated) {
            try {
                const favorited = likes[slug]?.favorited
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

    return (
        <div className={`${style.background_color} ${style.centerContainer}`}>
            <div className={style.article}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                        <h5 className={style.itemFullHeader}>{title}</h5>
                        <IconText
                            icon={HeartOutlined}
                            text={likes[slug]?.favoritesCount}
                            onClick={() => handleLike(slug)}
                            favorited={likes[slug]?.favorited}
                            key="list-vertical-like-o"
                        />
                    </div>
                    <div className={style.user_info}>
                        <Avatar src={author.image} size={48} />
                        <div className={style.name_date}>
                            <span className={style.itemFullUsername}>{author.username}</span>
                            <span className={style.itemFullDate}>{new Date(createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                </div>
                <div className={style.tag_list}>
                    {tagList.map((tag) => {
                        if (tag) {
                            return <Tag key={tag}>{tag}</Tag>
                        }
                    })}
                </div>
                <div className={style.styleGroupTextButton}>
                    <span className={style.ItemFullDescription}>{description}</span>
                    {isAuthenticated && user.username === author.username ? (
                        <div style={{ display: 'flex', gap: 5 }}>
                            <Button type="primary" onClick={showModal} danger ghost>
                                Delete
                            </Button>
                            <Button className={style.buttonGreen}>
                                <Link to={`/editItemList/${slug}`}>Edit</Link>
                            </Button>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    {isModalVisible ? (
                        <div className={style.modal}>
                            <span className={style.ModalText}>
                                <img src="../../../../img/Frame19.svg" alt="" style={{ width: 20, height: 20 }} />
                                Are you sure to delete this article?
                            </span>
                            <Button onClick={handleDelete} className={style.buttonModalYes}>
                                Yes
                            </Button>
                            <Button onClick={showModalCancelled} className={style.buttonModalNo}>
                                No
                            </Button>
                        </div>
                    ) : (
                        <Modal></Modal>
                    )}
                </div>
                <ReactMarkdown className={`${style.itemFullBody} bodyTitle`}>{body}</ReactMarkdown>
            </div>
        </div>
    )
}

export default ItemListFull
