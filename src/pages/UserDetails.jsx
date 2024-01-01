import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReviewsTable } from "../cmps/ReviewsTable"
import { loadReviews, setReviewFilterBy } from "../store/actions/review.actions"

export function UserDetails() {
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
    const navigate = useNavigate()

    useEffect(() => {
        setReviewFilterBy({ userId: user._id, toyId: null })
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/')
            return
        }
        loadReviews()
    }, [user])

    return (
        <section className="page user-details">
            <h1>Profile</h1>
            {user && <h2>Name: {user.fullname}</h2>}

            <h3>User Reviews</h3>
            <ReviewsTable reviews={reviews} fields={{ toyname: true }} />
        </section>
    )
}
