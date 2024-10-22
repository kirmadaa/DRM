
import { useDispatch } from 'react-redux'
import ChatLayout from '../../../Layouts/app/chat'
import { CHECK_CHAT } from '../../../Redux/actions/user'
import { useEffect, useState } from 'react'

const ChatApp = ()=>{
    const dispatch = useDispatch()
    const [chatInfo, setChatInfo] = useState()

    async function apiCall() {
        let res = await dispatch(CHECK_CHAT())
        setChatInfo(res?.data)
    }

    useEffect(() => {
        apiCall()
    }, [])

    return (
        <div>
            <ChatLayout chatInfo={chatInfo} />
        </div>
    )
}

export default ChatApp;