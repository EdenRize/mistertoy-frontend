
export function ToyPreview({ toy }) {
  return (
    <article className="toy-preview">
      <h4>{toy.name}</h4>
      <p>${toy.price}</p>
      <p className={toy.inStock ? 'in-stock' : 'out-of-stock'}>{toy.inStock ? 'In Stock' : 'Out of Stock'}</p>
      <img src={`../../src/assets/img/${toy.img}.svg`} />
    </article>
  )
}
