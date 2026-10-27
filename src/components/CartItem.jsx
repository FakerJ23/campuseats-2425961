// src/components/CartItem.jsx
function CartItem({ line, onChangeQty, onRemove }) {
  const { item, qty } = line
  
  return (
    <li className="cart-line">
      <div>
        <p className="cart-name">{item.name}</p>
        <p className="muted">RM {item.price.toFixed(2)} each</p>
      </div>
      <div className="qty">
        <button type="button" onClick={() => onChangeQty(item.id, -1)}>-</button>
        <span>{qty}</span>
        {/* Added 1 to quantity */}
        <button type="button" onClick={() => onChangeQty(item.id, 1)}>+</button>
      </div>
      {/* Derived the line total */}
      <p className="line-total">RM {(item.price * qty).toFixed(2)}</p>
      {/* Wired the remove button */}
      <button type="button" className="link danger" onClick={() => onRemove(item.id)}>Remove</button>
    </li>
  )
}
export default CartItem