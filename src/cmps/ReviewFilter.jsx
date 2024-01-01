import { useRef, useState } from "react"
import { utilService } from "../services/util.service"
import { useEffectUpdate } from "./customHooks/useEffectUpdate"

export function ReviewFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

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

    return (
        <fieldset className="review-filter">
            <legend>Review Filter:</legend>

            <label>Username:
                <input type="text"
                    name="username"
                    placeholder="Username..."
                    value={filterByToEdit.username || ''}
                    onChange={handleChange} />
            </label>

            <label>Toy Name:
                <input type="text"
                    name="toyname"
                    placeholder="Toy Name..."
                    value={filterByToEdit.toyname || ''}
                    onChange={handleChange} />
            </label>

        </fieldset>
    )
}
