// src/App.jsx
import { useState, useEffect } from 'react'
import Header from "./components/Header.jsx";
import VendorCard from "./components/VendorCard.jsx";
import MenuItemCard from "./components/MenuItemCard.jsx";
import Footer from "./components/Footer.jsx";
import { Loading, ErrorMessage } from "./components/Status.jsx";
import CartPage from "./components/CartPage.jsx";

function App() {
  const [vendors, setVendors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  const [view, setView] = useState('menu')
  
  // --- B3: Lifted Cart State ---
  const [cart, setCart] = useState([])
  const [lastOrder, setLastOrder] = useState(null)

  // --- B6: Filter Category State ---
  const [activeCategory, setActiveCategory] = useState('All')

  // Derive total quantity for the header badge
  const cartCount = cart.reduce((total, line) => total + line.qty, 0)

  // Add an item or increase its quantity if it already exists
  function handleAddToCart(item) {
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

  // Change quantity. If it drops to 0, the filter removes it.
  function handleChangeQty(itemId, delta) {
    setCart((prevCart) => 
      prevCart.map((line) => 
        line.item.id === itemId ? { ...line, qty: line.qty + delta } : line
      ).filter((line) => line.qty > 0) 
    )
  }

  function handleRemove(itemId) {
    setCart((prevCart) => prevCart.filter((line) => line.item.id !== itemId))
  }

  // B5: Handle order submission
  function handlePlaceOrder(details) {
    const total = cart.reduce((sum, line) => sum + (line.item.price * line.qty), 0)
    setLastOrder({ ...details, total })
    setCart([]) // Clear cart
    setView('done')
  }

  // B2: Fetching the data
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch('/api/vendors.json', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        setVendors(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [reloadKey])

  let content
  if (view === 'cart') {
    // Show the actual CartPage
    content = (
      <CartPage 
        cart={cart} 
        onChangeQty={handleChangeQty} 
        onRemove={handleRemove} 
        onPlaceOrder={handlePlaceOrder} 
      />
    )
  } else if (view === 'done') {
    content = (
      <div className="card">
        <h2>Order placed successfully!</h2>
        <p>Thank you, {lastOrder?.name}.</p>
        <p>Pick up at: <strong>{lastOrder?.pickupTime}</strong></p>
        <p>Total paid: RM {lastOrder?.total.toFixed(2)}</p>
        <button className="btn" onClick={() => setView('menu')} style={{marginTop: '1rem'}}>Back to Menus</button>
      </div>
    )
  } else if (loading) {
    content = <Loading />
  } else if (error) {
    content = <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else {
    const currentVendor = vendors[0]
    
    // Feature 1: Extract unique categories and filter the menu
    let categories = []
    let displayedMenu = []
    
    if (currentVendor) {
      // Create an array starting with 'All', followed by the unique categories from the menu
      categories = ['All', ...new Set(currentVendor.menu.map((item) => item.category))]
      
      // Derive the filtered list based on the active category
      displayedMenu = activeCategory === 'All' 
        ? currentVendor.menu 
        : currentVendor.menu.filter((item) => item.category === activeCategory)
    }

    content = (
      <>
        <section>
          <h2 className="section-title">Today's vendors</h2>
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </section>

        {currentVendor && (
          <section>
            <h2 className="section-title">Menu: {currentVendor.name}</h2>
            
            {/* Feature 1: Render the category filter buttons */}
            <div className="category-filters">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid">
              {/* Map over displayedMenu instead of currentVendor.menu */}
              {displayedMenu.map((item) => (
                <MenuItemCard key={item.id} item={item} onAdd={handleAddToCart} />
              ))}
            </div>
          </section>
        )}
      </>
    )
  }

  return (
    <>
      <Header 
        cartCount={cartCount}
        onShowMenu={() => setView('menu')} 
        onShowCart={() => setView('cart')} 
      />
      <main className="container">{content}</main>
      <Footer />
    </>
  )
}

export default App;