import { object, string, number } from 'yup';
import { toyService } from '../services/toy.service.js'
import { loadToy, saveToy } from '../store/actions/toy.actions.js'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions.js'
import { SwitchBtn } from '../cmps/SwitchBtn.jsx'
import { BackArrow } from '../cmps/BackArrow.jsx';

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()
  let toySchema = object({
    name: string().required(),
    price: number().required().positive(),
  });

  useEffect(() => {
    if (toyId) _loadToy()
  }, [])

  function _loadToy() {
    loadToy(toyId)
      .then(setToyToEdit)
      .catch((err) => {
        console.log('Had issued in toy edit:', err)
        navToIndex()
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
    toySchema.validate(toyToEdit).then(val => {
      saveToy(toyToEdit)
        .then(() => {
          showSuccessMsgRedux('Toy has been saved!')
          navToIndex()
        })
    })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          console.log('Validation failed:', err.errors[0]);

          showErrorMsgRedux(err.errors[0])
        } else {

          console.log('Cannot add toy', err)
          showErrorMsgRedux('Cannot add toy')
        }
      })
  }

  function navToIndex() {
    navigate('/toy')
  }

  return (
    <section className="page toy-edit">
      <h1>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h1>

      <form onSubmit={onSaveToy}>
        <div className="field-container">

          <label htmlFor="txt">Toy Text:</label>
          <input
            onChange={handleChange}
            value={toyToEdit.name}
            type="text"
            name="name"
            id="txt"
          />
        </div>

        <div className="field-container">

          <label htmlFor="price">Toy Price:</label>
          <input
            onChange={handleChange}
            value={toyToEdit.price || ''}
            type="number"
            name="price"
            id="price"
            min={0}
          />
        </div>

        <div className="field-container">

          <label>In Stock:</label>
          <SwitchBtn btnName={'inStock'} isOn={toyToEdit.inStock} onChange={handleChange} />
        </div>

        <button>{toyToEdit._id ? 'Edit' : 'Add'} Toy</button>
      </form>

      <BackArrow onArrowClick={navToIndex} />
    </section>
  )
}
