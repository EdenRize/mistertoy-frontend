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

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    addToyMsg,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getLabels,
}

_createToys()

async function query(filterBy = {}) {
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
    try {
        return await httpService.get(BASE_URL, filterBy)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during getting toys')
    }
}

async function getById(toyId) {
    // return storageService.get(STORAGE_KEY, toyId)
    try {
        return await httpService.get(BASE_URL + toyId)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during getting toy')

    }
}

async function remove(toyId) {
    // return storageService.remove(STORAGE_KEY, toyId)
    try {
        return await httpService.delete(BASE_URL + toyId)

    } catch (error) {
        throw new Error(error.message || 'An error occurred during removing toy')

    }
}

async function save(toy) {
    try {

        if (toy._id) {
            // return storageService.put(STORAGE_KEY, toy)
            return await httpService.put(BASE_URL, toy)
        } else {
            // return storageService.post(STORAGE_KEY, toy)
            return await httpService.post(BASE_URL, toy)
        }
    } catch (error) {

        throw new Error(error.message || 'An error occurred during saving toy')
    }
}

async function addToyMsg(toyId, txt) {
    try {
        return await httpService.post(`${BASE_URL}${toyId}/msg`, { txt })
    } catch (error) {
        throw new Error(error.message || 'An error occurred during adding msg')

    }
}


function getEmptyToy() {
    return {
        name: 'New Toy',
        price: utilService.getRandomIntInclusive(15, 200),
        labels: [...labels].splice(utilService.getRandomIntInclusive(0, labels.length - 4), 3),
        inStock: true,
        img: `../../src/assets/img/${utilService.getRandomIntInclusive(1, 10)}.svg`,
        msgs: []
    }
}

function getLabels() {
    return [...labels]
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
                img: '../../src/assets/img/8.svg'
            },
            {
                _id: 't102',
                name: 'Building Blocks Set',
                price: 45,
                labels: ['Puzzle', 'Outdoor'],
                createdAt: 1631031801022,
                inStock: true,
                img: '../../src/assets/img/10.svg'
            },
            {
                _id: 't103',
                name: 'Remote Control Car',
                price: 89,
                labels: ['Box game', 'Battery Powered'],
                createdAt: 1631031801033,
                inStock: true,
                img: '../../src/assets/img/7.svg'
            },
            {
                _id: 't104',
                name: 'Rubber Duck',
                price: 30,
                labels: ['On wheels', 'Art'],
                createdAt: 1631031801044,
                inStock: false,
                img: '../../src/assets/img/3.svg'
            },
            {
                _id: 't105',
                name: 'Talking Robot',
                price: 20,
                labels: ['Outdoor', 'Art'],
                createdAt: 1631031801055,
                inStock: true,
                img: '../../src/assets/img/9.svg'
            },
            {
                _id: 't106',
                name: 'Stuffed Animal - Teddy Bear',
                price: 15,
                labels: ['Puzzle', 'Doll'],
                createdAt: 1631031801066,
                inStock: true,
                img: '../../src/assets/img/4.svg'
            },
            {
                _id: 't107',
                name: 'Toy Train',
                price: 35,
                labels: ['Doll', 'Battery Powered'],
                createdAt: 1631031801077,
                inStock: true,
                img: '../../src/assets/img/5.svg'
            }
        ]

        localStorage.setItem(STORAGE_KEY, JSON.stringify(toys))
    }
}