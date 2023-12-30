import { useState } from "react"

export function AddMsg({ addMsg }) {
    const [msg, setMsg] = useState('')

    function onChangeMsg({ target }) {
        setMsg(target.value)
    }

    function onAddMessage(ev) {
        ev.preventDefault()
        addMsg(msg)
        setMsg('')
    }

    return (
        <div className="add-msg">
            <h3>Add Your Message</h3>
            <form onSubmit={onAddMessage}>
                <input value={msg} onChange={onChangeMsg} required type="text" placeholder="Write something..." />
                <button>Add Message</button>
            </form>
        </div>
    )
}
