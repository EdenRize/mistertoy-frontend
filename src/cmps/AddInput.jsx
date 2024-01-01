import { useState } from "react"

export function AddInput({ onSubmit, type }) {
    const [input, setInput] = useState('')

    function onChangeMsg({ target }) {
        setInput(target.value)
    }

    function onAddInput(ev) {
        ev.preventDefault()
        onSubmit(input)
        setInput('')
    }

    return (
        <div className="add-msg">
            <h3>Add Your {type}</h3>
            <form onSubmit={onAddInput}>
                <input value={input} onChange={onChangeMsg} required type="text" placeholder="Write something..." />
                <button>Add {type}</button>
            </form>
        </div>
    )
}
