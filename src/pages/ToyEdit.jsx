import { toyService } from '../services/toy.service.js'
import { loadToy, saveToy } from '../store/actions/toy.actions.js'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions.js'
import { SwitchBtn } from '../cmps/SwitchBtn.jsx'

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()
  console.log('toyToEdit', toyToEdit)

  useEffect(() => {
    if (toyId) _loadToy()
  }, [])

  function _loadToy() {
    loadToy(toyId)
      .then(setToyToEdit)
      .catch((err) => {
        console.log('Had issued in toy edit:', err)
        navigate('/toy')
        showErrorMsgRedux('Toy not found!')
      })
  }

  function handleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'radio':
        value = target.id
        break

      case 'checkbox':
        value = target.checked
        break

      default:
        break
    }
    setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
  }

  function onSaveToy(ev) {
    ev.preventDefault()
    saveToy(toyToEdit)
      .then(() => {
        showSuccessMsgRedux('Toy has been saved!')
        navigate('/toy')
      })
      .catch((err) => {
        console.log('Cannot add toy', err)
        showErrorMsgRedux('Cannot add toy')
      })
  }

  return (
    <section className="toy-edit">
      <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

      <form onSubmit={onSaveToy}>
        <label htmlFor="txt">Toy Text:</label>
        <input
          onChange={handleChange}
          value={toyToEdit.name}
          type="text"
          name="name"
          id="txt"
        />

        <label htmlFor="price">Toy Price:</label>
        <input
          onChange={handleChange}
          value={toyToEdit.price}
          type="number"
          name="price"
          id="price"
          min={0}
        />

        <SwitchBtn btnName={'inStock'} isOn={toyToEdit.inStock} label={'In Stock'} onChange={handleChange} />

        <button>{toyToEdit._id ? 'Edit' : 'Add'} Toy</button>
      </form>
    </section>
  )
}
