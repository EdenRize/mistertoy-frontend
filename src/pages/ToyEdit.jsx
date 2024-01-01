import { object, string, number } from 'yup';
import { toyService } from '../services/toy.service.js'
import { loadToy, saveToy } from '../store/actions/toy.actions.js'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions.js'
import { SwitchBtn } from '../cmps/SwitchBtn.jsx'
import { BackArrow } from '../cmps/BackArrow.jsx';
import { uploadService } from '../services/upload.service.js';

export function ToyEdit() {
  const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
  const { toyId } = useParams()
  const navigate = useNavigate()
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)
  console.log('toyToEdit.img', toyToEdit.img)

  let toySchema = object({
    name: string().required(),
    price: number().required().positive(),
  })

  useEffect(() => {
    if (!user.isAdmin) navToIndex()
    if (toyId) _loadToy()
  }, [])

  async function _loadToy() {
    try {
      const toy = await loadToy(toyId)
      setToyToEdit(toy)
    } catch (error) {
      console.log('Had issued in toy edit:', error)
      navToIndex()
      showErrorMsgRedux('Toy not found!')
    }
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

  async function onSaveToy(ev) {
    try {

      ev.preventDefault()
      await toySchema.validate(toyToEdit)
      await saveToy(toyToEdit)
      showSuccessMsgRedux('Toy has been saved!')
      navToIndex()

    } catch (error) {
      if (error.name === 'ValidationError') {
        console.log('Validation failed:', error.errors[0]);
        showErrorMsgRedux(error.errors[0])
      } else {
        console.log('Cannot add toy', error)
        showErrorMsgRedux('Cannot add toy')
      }

    }
  }

  function navToIndex() {
    navigate('/toy')
  }

  async function onImgChange(ev) {
    const img = await uploadService.uploadImg(ev)
    setToyToEdit((prevToy) => ({ ...prevToy, img }))
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

        <div className="field-container">

          <label>Toy Image:</label>
          <input type="file" onChange={onImgChange} />
          {toyToEdit.img && <img src={toyToEdit.img} />}
        </div>

        <button>{toyToEdit._id ? 'Edit' : 'Add'} Toy</button>
      </form>

      <BackArrow onArrowClick={navToIndex} />
    </section>
  )
}
