import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EMIT_SET_TYPING, SOCKET_EMIT_REMOVE_TYPING } from '../services/socket.service'

export function Chat({ topic, title }) {
    const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isChatOpen, setIsChatOpen] = useState(false)
    const [typingUsers, setTypingUsers] = useState([])
    const timeOut = useRef()

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)

        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.on(SOCKET_EMIT_SET_TYPING, onUserTyping)

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
            socketService.off(SOCKET_EMIT_SET_TYPING, addMsg)
        }
    }, [])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function onUserTyping(userName) {
        setTypingUsers(prevUsers => {
            if (!prevUsers.includes(userName)) {
                return [...prevUsers, userName]
            } else {
                return prevUsers
            }
        })
        clearTimeout(timeOut.current)
        timeOut.current = setTimeout(() => {
            console.log('here');
            setTypingUsers(prevUsers => prevUsers.filter(user => user !== userName))
        }, 3000)
    }



    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedinUser?.fullname || 'Guest'
        const newMsg = { from, txt: msg.txt }
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
        // We add the msg ourself to our own state
        addMsg(newMsg)
        setMsg({ txt: '' })
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        value ?
            socketService.emit(SOCKET_EMIT_SET_TYPING, loggedinUser?.fullname || 'Guest') :
            socketService.emit(SOCKET_EMIT_REMOVE_TYPING, loggedinUser?.fullname || 'Guest')
    }


    return (
        <section className="chat">

            {isChatOpen && <div className="chat-container">
                <h3>{title || topic} Chat</h3>
                <ul className='clean-list'>
                    {msgs.map((msg, idx) => (<li className={`msg ${msg.from === loggedinUser?.fullname ? 'logged-user-msg' : ''}`} key={idx}><span>{msg.from}:</span> {msg.txt}</li>))}
                </ul>

                {!!typingUsers.length && <p className='typing-msg'>
                    {typingUsers.length === 1 ?
                        `${typingUsers[0]} `
                        :
                        typingUsers.map((user, idx) => {
                            return (idx === typingUsers.length - 1) ? `${user} ` : `${user} & `

                        })}
                    is typing...
                </p>}

                <form onSubmit={sendMsg}>
                    <input
                        type="text" value={msg.txt} onChange={handleFormChange}
                        name="txt" autoComplete="off" placeholder='Write something...' />
                    <button>Send</button>
                </form>


            </div>
            }

            <img onClick={() => setIsChatOpen(prevIsOpen => !prevIsOpen)} className='chat-btn' src="../../src/assets/img/chat.svg" alt="" />
        </section>
    )
}