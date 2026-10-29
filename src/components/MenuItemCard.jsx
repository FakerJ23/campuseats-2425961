import { useCart } from '../hooks/useCart.js'

function MenuItemCard({ item }) {
  const { addToCart } = useCart()
  return (
    <article className="card menu-card">
      <div className="thumb" aria-hidden="true">{item.name.charAt(0)}</div>
      <h3>{item.name}</h3>
      <p className="price">RM {item.price.toFixed(2)}</p>
      <button className="btn" disabled={!item.available} onClick={() => addToCart(item)}>
        {item.available ? 'Add to cart' : 'Sold out'}
      </button>
    </article>
  )
}
export default MenuItemCard