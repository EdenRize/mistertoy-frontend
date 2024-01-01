import { toyService } from "../../services/toy.service.js"


// toy
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const TOY_UNDO = 'TOY_UNDO'

export const SET_IS_LOADING = 'SET_IS_LOADING'

export const SET_FILTER_BY = 'SET_FILTER_BY'

export const ADD_MSG = 'ADD_MSG'

const initialState = {
    toys: [],
    // lastToys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = initialState, action = {}) {

    let toys
    let lastToys
    switch (action.type) {
        // toy
        case SET_TOYS:
            return { ...state, toys: action.toys }

        case REMOVE_TOY:
            lastToys = [...state.toys]
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys, lastToys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            console.log('state.toys', state.toys)
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }


        // general
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        case TOY_UNDO:
            toys = [...state.lastToys]
            return { ...state, toys }

        case ADD_MSG:
            var toy = state.toys.find(currToy => {
                return currToy._id === action.data.toyId
            })
            toy = { ...toy, msgs: [action.data.msg, ...toy.msgs] }
            toys = state.toys.map(currToy => currToy._id === action.data.toyId ? toy : currToy)
            return { ...state, toys }

        default:
            return state
    }
}
