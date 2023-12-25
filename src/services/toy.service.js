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

_createToys()

function query(filterBy = {}) {
    // if (!filterBy.txt) filterBy.txt = ''
    // if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
    // const regExp = new RegExp(filterBy.txt, 'i')

    // return storageService.query(STORAGE_KEY)
    //     .then(toys => {
    //         return toys.filter(toy =>
    //             regExp.test(toy.name) &&
    //             toy.price <= filterBy.maxPrice
    //         )
    //     })


    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    // return storageService.get(STORAGE_KEY, toyId)

    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        // return storageService.put(STORAGE_KEY, toy)
        return httpService.put(BASE_URL, toy)
    } else {
        // return storageService.post(STORAGE_KEY, toy)
        return httpService.post(BASE_URL, toy)
    }
}


function getEmptyToy() {
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    return {
        name: 'New Toy',
        price: utilService.getRandomIntInclusive(15, 200),
        labels: labels.splice(utilService.getRandomIntInclusive(0, labels.length - 4), 3),
        inStock: true
    }
}


function getDefaultFilter() {
    return { txt: '', maxPrice: '', labels: [], inStock: 'all', sortBy: 'createdAt' }
}

function _createToys() {
    const toysFromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!toysFromStorage || !toysFromStorage.length) {
        const toys = [
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: 1631031801011,
                inStock: false,
            },
            {
                _id: 't102',
                name: 'Building Blocks Set',
                price: 45,
                labels: ['Puzzle', 'Outdoor'],
                createdAt: 1631031801022,
                inStock: true,
            },
            {
                _id: 't103',
                name: 'Remote Control Car',
                price: 89,
                labels: ['Box game', 'Battery Powered'],
                createdAt: 1631031801033,
                inStock: true,
            },
            {
                _id: 't104',
                name: 'Board Game - Monopoly',
                price: 30,
                labels: ['On wheels', 'Art'],
                createdAt: 1631031801044,
                inStock: false,
            },
            {
                _id: 't105',
                name: 'Puzzle Set',
                price: 20,
                labels: ['Outdoor', 'Art'],
                createdAt: 1631031801055,
                inStock: true,
            },
            {
                _id: 't106',
                name: 'Stuffed Animal - Teddy Bear',
                price: 15,
                labels: ['Puzzle', 'Doll'],
                createdAt: 1631031801066,
                inStock: true,
            },
            {
                _id: 't107',
                name: 'Art Supplies Kit',
                price: 35,
                labels: ['Doll', 'Battery Powered'],
                createdAt: 1631031801077,
                inStock: true,
            }
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
    }
}