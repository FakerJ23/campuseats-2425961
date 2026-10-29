import { CartContext } from './cart-context.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

export function CartProvider({ children }) {
  // Use the custom hook so cart and orders survive a refresh
  const [cart, setCart] = useLocalStorage('campuseats-cart', [])
  const [orders, setOrders] = useLocalStorage('campuseats-orders', [])

  const count = cart.reduce((total, line) => total + line.qty, 0)
  const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)

  function addToCart(item) {
    setCart((prevCart) => {
      const existing = prevCart.find((line) => line.item.id === item.id)
      if (existing) {
        return prevCart.map((line) => 
          line.item.id === item.id ? { ...line, qty: line.qty + 1 } : line
        )
      }
      return [...prevCart, { item, qty: 1 }]
    })
  }

  function changeQty(itemId, delta) {
    setCart((prevCart) => 
      prevCart.map((line) => 
        line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
      ).filter((line) => line.qty > 0) 
    )
  }

  function removeFromCart(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  function placeOrder(details) {
    const newOrder = { ...details, total, id: Date.now() }
    setOrders((prev) => [newOrder, ...prev])
    setCart([]) // Clear the cart after ordering
  }

  return (
    <CartContext.Provider value={{ 
      cart, orders, count, total, addToCart, changeQty, removeFromCart, placeOrder 
    }}>
      {children}
    </CartContext.Provider>
  )
}