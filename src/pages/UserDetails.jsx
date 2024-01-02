import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReviewsTable } from "../cmps/ReviewsTable"
import { loadReviews, removeReview, setReviewFilterBy } from "../store/actions/review.actions"
import { showErrorMsg } from "../services/event-bus.service"

export function UserDetails() {
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) setReviewFilterBy({ userId: user._id, toyId: null })
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/')
            return
        }
        loadReviews()
    }, [user])

    async function onDeleteReview(reviewId) {
        try {
            await removeReview(reviewId)
            loadReviews()
        } catch (error) {
            console.log('Had issues in toy details', error)
            showErrorMsg('Cannot delete review')
        }

    }


    if (!user) return <div>Loading...</div>
    return (
        <section className="page user-details">
            <h1>Profile</h1>
            <h2>Name: {user.fullname}</h2>

            <h3>User Reviews</h3>
            <ReviewsTable reviews={reviews} fields={{ toyname: true }} onDelete={onDeleteReview} />
        </section>
    )
}
