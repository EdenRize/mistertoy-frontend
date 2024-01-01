import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

const BASE_URL = 'review/'

export const reviewService = {
  add,
  query,
  remove
}

async function query(filterBy) {
  try {
    return await httpService.get(BASE_URL, filterBy)
  } catch (error) {
    throw new Error(error.message || 'An error occurred during getting toys')
  }
}

async function remove(reviewId) {
  try {
    return await httpService.delete(BASE_URL + reviewId)

  } catch (error) {
    throw new Error(error.message || 'An error occurred during removing toy')

  }
}

async function add({ txt, toyId }) {
  const reviewToAdd = {
    txt,
    userId: userService.getLoggedinUser(),
    toyId
  }

  const addedReview = await httpService.post(BASE_URL, reviewToAdd)
  return addedReview
}