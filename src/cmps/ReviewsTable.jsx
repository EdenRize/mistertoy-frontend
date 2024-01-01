
export function ReviewsTable({ reviews, fields }) {
    if (!reviews.length) return <div>No reviews yet</div>
    return (
        <table className="reviews-table general-table">
            <thead>
                <tr>
                    {fields.username && <td>Username:</td>}
                    {fields.toyname && <td>Toy Name:</td>}
                    <td>Review:</td>
                </tr>
            </thead>

            <tbody>
                {reviews.map(review => {
                    return <tr key={review._id}>
                        {fields.username && <td>{review.user.fullname}</td>}
                        {fields.toyname && <td>{review.toy.name}</td>}
                        <td>{review.txt}</td>
                    </tr>
                })}
            </tbody>

        </table>
    )
}
