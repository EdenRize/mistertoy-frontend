// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { useEffect, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { useNavigate, useParams } from "react-router-dom"
import { BackArrow } from "../cmps/BackArrow.jsx"
import { MsgsTable } from "../cmps/MsgsTable.jsx"
import { useSelector } from "react-redux"
import { AddInput } from "../cmps/AddInput.jsx"
import { addMsg } from "../store/actions/toy.actions.js"
import { addReview, loadReviews, removeReview, setReviewFilterBy } from "../store/actions/review.actions.js"
import { ReviewsTable } from "../cmps/ReviewsTable.jsx"
import { socketService, SOCKET_EVENT_TOY_UPDATED, SOCKET_EMIT_TOY_WATCH } from '../services/socket.service'
import { Chat } from "../cmps/Chat.jsx"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)


    useEffect(() => {
        loadToy()
        setReviewFilterBy({ toyId, userId: null })
        loadReviews()

        // TODO : Emit watch on the user + add a listener for when user changes
        socketService.emit(SOCKET_EMIT_TOY_WATCH, toyId)
        socketService.on(SOCKET_EVENT_TOY_UPDATED, (toy) => {
            setToy(toy)
        })

        return () => socketService.off(SOCKET_EVENT_TOY_UPDATED)
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (error) {
            console.log('Had issues in toy details', error)
            showErrorMsg('Cannot load toy')
            navToIndex()
        }
    }

    function navToIndex() {
        navigate('/toy')
    }

    async function _addMsg(txt) {
        try {
            await addMsg(toyId, txt)
            loadToy()
        } catch (error) {
            console.log('Had issues in toy details', error)
            showErrorMsg('Cannot add message')
        }

    }

    async function _addReview(txt) {
        try {
            await addReview({ toyId, txt, user })
            loadToy()
        } catch (error) {
            console.log('Had issues in toy details', error)
            showErrorMsg('Cannot add review')
        }
    }

    async function onDeleteReview(reviewId) {
        try {
            await removeReview(reviewId)
            loadToy()
        } catch (error) {
            console.log('Had issues in toy details', error)
            showErrorMsg('Cannot delete review')
        }

    }


    if (!toy) return <div>Loading...</div>
    return (
        <section className="page toy-details">
            <h1>Toy Name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
            <h4>Labels:</h4>
            <ul className="clean-list">
                {toy.labels.map((label, idx) => {
                    return <li key={idx}>{label}</li>
                })}
            </ul>
            <p className="toy-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>

            <img src={toy.img} className="toy-img" />

            <h3>Users's messages</h3>
            <MsgsTable msgs={toy.msgs} />

            {user && <AddInput onSubmit={_addMsg} type={'Message'} />}

            <h3>Toy Reviews</h3>
            <ReviewsTable reviews={reviews} fields={{ username: true }} onDelete={onDeleteReview} />

            {user && <AddInput onSubmit={_addReview} type={'Review'} />}
            <BackArrow onArrowClick={navToIndex} />

            <Chat topic={toy._id} title={toy.name} />
        </section>
    )
}