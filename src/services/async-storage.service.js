export const storageService = {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType, delay = 300) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

async function get(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const entity = entities.find(entity => entity._id === entityId)

        if (!entity) {
            throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        }

        return entity
    } catch (error) {
        console.error('Error in get:', error)
        throw error
    }
}

async function post(entityType, newEntity) {
    try {
        newEntity = { ...newEntity }
        newEntity._id = _makeId()
        newEntity.createdAt = Date.now()

        const entities = await query(entityType)
        entities.unshift(newEntity)

        await _save(entityType, entities)

        return newEntity
    } catch (error) {
        console.error('Error in post:', error)
        throw error
    }
}


async function put(entityType, updatedEntity) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)

        if (idx < 0) {
            throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        }

        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)

        return updatedEntity
    } catch (error) {
        console.error('Error in put:', error)
        throw error
    }
}


async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === entityId)

        if (idx < 0) {
            throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        }

        entities.splice(idx, 1)
        _save(entityType, entities)
    } catch (error) {
        console.error('Error in remove:', error)
        throw error
    }
}


// Private functions

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}