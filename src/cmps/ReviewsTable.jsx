import { useSelector } from "react-redux"

export function ReviewsTable({ reviews, fields }) {
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)

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
                    return <tr className="review-tr" key={review._id}>
                        {fields.username && <td>{review.user.fullname}</td>}
                        {fields.toyname && <td>{review.toy.name}</td>}
                        <td>{review.txt}</td>
                        {review.user._id === user._id && <td><img src="../assets/img/delete.svg" /></td>}
                    </tr>
                })}
            </tbody>

        </table>
    )
}
