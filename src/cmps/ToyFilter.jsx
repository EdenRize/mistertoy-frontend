import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

import { useEffect, useRef, useState } from "react"
import { utilService } from "../services/util.service.js"
import { useEffectUpdate } from "./customHooks/useEffectUpdate.js"
import { toyService } from "../services/toy.service.js"
import { Multiselect } from "./Multiselect.jsx"


export function ToyFilter({ filterBy, onSetFilter }) {
  // const [isShowLabels, setIsShowLabels] = useState(false)
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
  onSetFilter = useRef(utilService.debounce(onSetFilter))
  const labels = toyService.getLabels()

  useEffectUpdate(() => {
    onSetFilter.current(filterByToEdit)
  }, [filterByToEdit])

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

      default:
        break
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function handelLabelSelect(labels) {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels }))
  }


  return (
    <fieldset className="toy-filter">
      <legend>Toys Filter:</legend>

      <form onSubmit={ev => ev.preventDefault()}>
        {/* <div className="inputs-container"> */}

        <div className="filter">

          <label htmlFor="name">Name:</label>
          <input type="text"
            id="name"
            name="txt"
            placeholder="By name"
            value={filterByToEdit.txt}
            onChange={handleChange}
          />
        </div>

        <fieldset className='option-fieldset'>
          <legend>Select Status:</legend>

          <div className='option-container'>
            <label htmlFor="all">All</label>
            <input
              type="radio"
              id="all"
              name="inStock"
              checked={filterByToEdit.inStock === 'all'}
              onChange={handleChange}
            />
          </div>

          <div className='option-container'>
            <label htmlFor="inStock">In Stock</label>
            <input
              type="radio"
              id="inStock"
              name="inStock"
              checked={filterByToEdit.inStock === 'inStock'}
              onChange={handleChange}
            />
          </div>

          <div className='option-container'>
            <label htmlFor="outOfStock">Out of Stock</label>
            <input
              type="radio"
              id="outOfStock"
              name="inStock"
              checked={filterByToEdit.inStock === 'outOfStock'}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        <Multiselect label={'Choose labels:'} options={labels} onSelect={handelLabelSelect} />
        {/* </div> */}

        {/* <div className="fieldset-container"> */}


        <fieldset className='option-fieldset'>
          <legend>Select Sort By:</legend>

          <div className='option-container'>
            <label htmlFor="createdAt">Created At</label>
            <input
              type="radio"
              id="createdAt"
              name="sortBy"
              checked={filterByToEdit.sortBy === 'createdAt'}
              onChange={handleChange}
            />
          </div>

          <div className='option-container'>
            <label htmlFor="name">Name</label>
            <input
              type="radio"
              id="name"
              name="sortBy"
              checked={filterByToEdit.sortBy === 'name'}
              onChange={handleChange}
            />
          </div>

          <div className='option-container'>
            <label htmlFor="price">Price</label>
            <input
              type="radio"
              id="price"
              name="sortBy"
              checked={filterByToEdit.sortBy === 'price'}
              onChange={handleChange}
            />
          </div>
        </fieldset>
        {/* </div> */}

      </form>
    </fieldset>



  )
}
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
  'Outdoor', 'Battery Powered']