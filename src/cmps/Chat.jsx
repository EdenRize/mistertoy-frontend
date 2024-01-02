import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_ADD_MSG, SOCKET_EMIT_SET_TOPIC } from '../services/socket.service'

export function Chat({ topic, title }) {
    const loggedinUser = useSelector((storeState) => storeState.userModule.loggedinUser)

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isChatOpen, setIsChatOpen] = useState(false)

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, topic)

        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
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
    }

    return (
        <section className="chat">

            {isChatOpen && <div className="chat-container">
                <ul className='clean-list'>
                    {msgs.map((msg, idx) => (<li className={`msg ${msg.from === loggedinUser?.fullname ? 'logged-user-msg' : ''}`} key={idx}><span>{msg.from}:</span> {msg.txt}</li>))}
                </ul>

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