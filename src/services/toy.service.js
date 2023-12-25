
import Axios from 'axios'
import { utilService } from './util.service.js'
import { httpService } from './http.service.js'
import { storageService } from './async-storage.service.js'

// for cookies
const axios = Axios.create({
    withCredentials: true
})

const BASE_URL = 'toy/'
const STORAGE_KEY = 'toyDB'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter
}

function query(filterBy = {}) {
    if (!filterBy.txt) filterBy.txt = ''
    if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    const regExp = new RegExp(filterBy.txt, 'i')

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            return toys.filter(toy =>
                regExp.test(toy.name) &&
                toy.price <= filterBy.maxPrice
            )
        })

    // return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)

    // return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
    // return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
        // return httpService.put(BASE_URL, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
        // return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    return {
        name: 'Susita-' + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1000, 9000),
        labels: labels.splice(utilService.getRandomIntInclusive(0, labels.length - 4), 3),
        inStock: true
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', labels: [] }
}



