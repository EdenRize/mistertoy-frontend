import { useDispatch, useSelector } from 'react-redux'
import { loadToys, removeToyOptimistic, setFilterBy } from '../store/actions/toy.actions'
import { showErrorMsgRedux, showSuccessMsgRedux } from '../store/actions/app.actions'
import { useEffect } from 'react'
import { ToyFilter } from '../cmps/ToyFilter'
import { ToyList } from '../cmps/ToyList'
import { Link } from 'react-router-dom'

export  function ToyIndex() {
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

    function onAddToy() {
        const toyToSave = toyService.getEmptyToy()
        saveToy(toyToSave)
            .then((savedToy) => {
                console.log('savedToy:', savedToy)
                showSuccessMsgRedux(`Toy added (vendor: ${savedToy.vendor})`)
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsgRedux('Cannot add toy')
            })
    }

    // function onEditToy(toy) {
    //     const price = +prompt('New price?')
    //     const toyToSave = { ...toy, price }

    //     saveToy(toyToSave)
    //         .then((savedToy) => {
    //             showSuccessMsgRedux(`Toy updated to price: $${savedToy.price}`)
    //         })

    //         .catch(err => {
    //             console.log('Cannot update toy', err)
    //             showErrorMsgRedux('Cannot update toy')
    //         })
    // }

    function onSetFilter(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(filterBy)
    }

  return (
    <section className='main-layout toy-index'>
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
