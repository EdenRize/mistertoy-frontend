import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials
}

async function getById(userId) {
    try {
        return await httpService.get(BASE_URL + userId)
    } catch (error) {
        return Promise.reject(error.message || 'An error occurred during getting user')
    }
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + 'login', { username, password })

        if (user) {
            return _setLoggedinUser(user)
        } else {
            throw new Error('Invalid login')
        }
    } catch (error) {
        return Promise.reject(error.message || 'An error occurred during login')
    }
}

async function signup({ username, password, fullname }) {
    try {
        const user = { username, password, fullname, isAdmin: false }
        const newUser = await httpService.post(BASE_URL + 'signup', user)

        if (newUser) {
            return _setLoggedinUser(newUser)
        } else {
            throw new Error('Invalid signup')
        }
    } catch (error) {
        return Promise.reject(error.message || 'An error occurred during signup')
    }
}



async function updateScore(diff) {
    try {
        if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
        const user = await httpService.put('user/', { diff })

        if (user) {
            _setLoggedinUser(user)
            return user.score
        } else {
            throw new Error('Invalid user')
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred during score update')
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + 'logout')
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (error) {
        throw new Error(error.message || 'An error occurred during logout')
    }
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// userService.login({username: 'muki', password: 'muki1'})



