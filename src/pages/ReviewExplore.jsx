import { useEffect } from "react"
import { loadReviews, removeReview, setReviewFilterBy } from "../store/actions/review.actions"
import { useSelector } from "react-redux"
import { ReviewsTable } from "../cmps/ReviewsTable"
import { ReviewFilter } from "../cmps/ReviewFilter"
import { useEffectUpdate } from "../cmps/customHooks/useEffectUpdate"
import { showErrorMsg } from "../services/event-bus.service"

export function ReviewExplore() {
    const reviews = useSelector((storeState) => storeState.reviewModule.reviews)
    const filterBy = useSelector((storeState) => storeState.reviewModule.filterBy)

    useEffect(() => {
        setReviewFilterBy({ userId: null, toyId: null })
        loadReviews()
    }, [])

    useEffectUpdate(() => {
        loadReviews()
    }, [filterBy])

    function onSetFilterBy(filter) {
        setReviewFilterBy(filter)
    }

    async function onDeleteReview(reviewId) {
        try {
            await removeReview(reviewId)
            loadReviews()
        } catch (error) {
            console.log('Had issues in toy details', error)
            showErrorMsg('Cannot delete review')
        }

    }


    return (
        <section className="page review-explore">
            <h1>Review Explore</h1>
            <ReviewFilter filterBy={filterBy} onSetFilter={onSetFilterBy} />

            <ReviewsTable reviews={reviews} fields={{ toyname: true, username: true }} onDelete={onDeleteReview} />

        </section>
    )
}
