import { useDispatch, useSelector } from 'react-redux'
import { loadToys, removeToyOptimistic, setFilterBy } from '../store/actions/toy.actions'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions'
import { useEffect } from 'react'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'
import { Link } from 'react-router-dom'

export function ToyIndex() {
    const toys = useSelector(storeState => storeState.toyModule.toys)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    useEffect(() => {
        loadToys()
            .catch(() => {
                showErrorMsgRedux('Cannot show toys')
            })
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToyOptimistic(toyId)
            .then(() => {
                showSuccessMsgRedux('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsgRedux('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <section className='toy-index'>
            <h1>Toys</h1>
            <main>
                <Link to="/toy/edit"><button>Add Toy</button></Link>
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />
                {!isLoading && <ToyList
                    toys={toys}
                    onRemoveToy={onRemoveToy}
                />}
                {isLoading && <div>Loading...</div>}
            </main>
        </section>
    )
}
