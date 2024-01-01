
export function ReviewsTable({ reviews }) {
    console.log('reviews', reviews)
    if (!reviews.length) return <div>No reviews yet</div>
    return (
        <table className="reviews-table general-table">
            <thead>
                <tr>
                    <td>Username:</td>
                    <td>Review:</td>
                </tr>
            </thead>

            <tbody>
                {reviews.map(review => {
                    return <tr key={review._id}>
                        <td>{review.user.fullname}</td>
                        <td>{review.txt}</td>
                    </tr>
                })}
            </tbody>

        </table>
    )
}
