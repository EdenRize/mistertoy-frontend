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
    <section className="toy-filter full main-layout">
      <h2>Toys Filter</h2>
      <form onSubmit={ev => ev.preventDefault()}>
        <label htmlFor="name">Name:</label>
        <input type="text"
          id="name"
          name="txt"
          placeholder="By name"
          value={filterByToEdit.txt}
          onChange={handleChange}
        />

        <label htmlFor="maxPrice">Max price:</label>
        <input type="number"
          id="maxPrice"
          name="maxPrice"
          placeholder="By max price"
          value={filterByToEdit.maxPrice || ''}
          onChange={handleChange}
        />

        <fieldset>
          <legend>Select Status:</legend>

          <div>
            <label htmlFor="all">All</label>
            <input
              type="radio"
              id="all"
              name="inStock"
              checked={filterByToEdit.inStock === 'all'}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="inStock">In Stock</label>
            <input
              type="radio"
              id="inStock"
              name="inStock"
              checked={filterByToEdit.inStock === 'inStock'}
              onChange={handleChange}
            />
          </div>

          <div>
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

      </form>

      <h2>Toys Sort</h2>

      <fieldset>
        <legend>Select Sort By:</legend>

        <div>
          <label htmlFor="createdAt">Created At</label>
          <input
            type="radio"
            id="createdAt"
            name="sortBy"
            checked={filterByToEdit.sortBy === 'createdAt'}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            type="radio"
            id="name"
            name="sortBy"
            checked={filterByToEdit.sortBy === 'name'}
            onChange={handleChange}
          />
        </div>

        <div>
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

    </section>
  )
}
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
  'Outdoor', 'Battery Powered']