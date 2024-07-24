import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

const SOCKET_URL = 'https://blog.kata.academy/api/articles'

const useSocket = () => {
    const token = useSelector((state) => state.auth.token)

    const socket = io(SOCKET_URL, {
        transports: ['websocket'],
        secure: true, // Используйте secure: true для WSS
        reconnection: true, // Включите автоматическое переподключение
        reconnectionAttempts: 1, // Количество попыток переподключения
        reconnectionDelay: 5000, // Задержка между попытками переподключения
        auth: {
            token: `Bearer ${token}`,
        },
    })

    return socket
}

export default useSocket
