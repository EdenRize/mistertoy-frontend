import { toyService } from "../../services/toy.service.js"
import { ADD_TOY, TOY_UNDO, REMOVE_TOY, SET_TOYS, SET_FILTER_BY, SET_IS_LOADING, UPDATE_TOY } from "../reducers/toy.reducer.js"
import { store } from "../store.js"


export async function loadToys() {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })

        const filterBy = store.getState().toyModule.filterBy
        const toys = await toyService.query(filterBy)

        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.error('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function loadToy(toyId) {
    try {
        const toy = await toyService.getById(toyId)
        return toy
    } catch (err) {
        console.error('Error loading toy', err)
        throw err
    }
}


export async function removeToyOptimistic(toyId) {
    try {
        store.dispatch({ type: REMOVE_TOY, toyId })
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })

        await toyService.remove(toyId)

    } catch (err) {
        store.dispatch({ type: TOY_UNDO })
        console.error('toy action -> Cannot remove toy', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}



export async function removeToy(toyId) {
    try {
        store.dispatch({ type: SET_IS_LOADING, isLoading: true })
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.error('toy action -> Cannot remove toy', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}


export async function saveToy(toy) {
    try {
        const type = toy._id ? UPDATE_TOY : ADD_TOY
        const toyToSave = await toyService.save(toy)
        store.dispatch({ type, toy: toyToSave })
        return toyToSave
    } catch (err) {
        console.error('toy action -> Cannot save toy', err)
        throw err
    }
}


export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}