import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview"

export function ToyList({toys, onRemoveToy}) {
    if(!toys.length) return <div>No Toys To Display 🐻</div>
  return (
    <ul className="toy-list clean-list">
        {toys.map((toy) => {
        return (
          <li key={toy._id} className="toy">
            <ToyPreview toy={toy} />
            <Link to={`/toy/${toy._id}`}>
              <button>Details</button>
            </Link>
            <Link to={`/toy/edit/${toy._id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => onRemoveToy(toy._id)}>Delete</button>
          </li>
        )
      })}
    </ul>
  )
}
