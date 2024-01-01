import { useEffect } from "react"
import { loadReviews, setReviewFilterBy } from "../store/actions/review.actions"
import { useSelector } from "react-redux"
import { ReviewsTable } from "../cmps/ReviewsTable"
import { ReviewFilter } from "../cmps/ReviewFilter"
import { useEffectUpdate } from "../cmps/customHooks/useEffectUpdate"

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


    return (
        <section className="page review-explore">
            <h1>Review Explore</h1>
            <ReviewFilter filterBy={filterBy} onSetFilter={onSetFilterBy} />

            <ReviewsTable reviews={reviews} fields={{ toyname: true, username: true }} />

        </section>
    )
}
