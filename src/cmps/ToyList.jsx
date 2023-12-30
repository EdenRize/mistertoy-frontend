import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"
import { useSelector } from "react-redux"

export function ToyList({ toys, onRemoveToy }) {
  const user = useSelector((storeState) => storeState.userModule.loggedinUser)

  if (!toys.length) return <div>No Toys To Display 🐻</div>
  return (
    <ul className="toy-list clean-list">
      {toys.map((toy) => {
        return (
          <li key={toy._id} className="toy-card">
            <ToyPreview toy={toy} />
            <div className="toy-btns-container">
              <Link to={`/toy/${toy._id}`}>
                <button>Details</button>
              </Link>
              {(user && user.isAdmin) &&
                <>
                  <Link to={`/toy/edit/${toy._id}`}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={() => onRemoveToy(toy._id)}>Delete</button>
                </>

              }
            </div>
          </li>
        )
      })}
    </ul>
  )
}
