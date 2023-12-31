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
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadToys()
            } catch (error) {
                showErrorMsgRedux('Cannot show toys')
            }
        }

        fetchData()
    }, [filterBy])

    async function onRemoveToy(toyId) {
        try {
            await removeToyOptimistic(toyId)
            showSuccessMsgRedux('Toy removed')
        } catch (err) {
            console.error('Cannot remove toy', err)
            showErrorMsgRedux('Cannot remove toy')
        }
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <section className='page toy-index'>
            <main>
                <h1>Toys</h1>
                {(user && user.isAdmin) && <Link to="/toy/edit"><button className='add-toy-btn'>Add Toy</button></Link>}

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
