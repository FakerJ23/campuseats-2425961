// src/pages/Pages.jsx
import { useState, useEffect } from 'react'
import { Outlet, useParams, useSearchParams, Link } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useAuth } from '../hooks/useAuth.js'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import VendorCard from '../components/VendorCard.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export function HomePage() {
  const { vendors, loading, error, reload } = useVendors()

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  return (
    <section>
      <h2 className="section-title">Today's vendors</h2>
      <div className="grid">
        {vendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>
    </section>
  )
}

export function VendorPage() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { vendors, loading, error, reload } = useVendors()
  const { user } = useAuth()

  const [savedCategory, setSavedCategory] = useState(() => {
    if (!user) return 'All'
    try {
      return localStorage.getItem(`ce-category-${user.uid}`) || 'All'
    } catch {
      return 'All'
    }
  })

  useEffect(() => {
    if (!user) {
      setSavedCategory('All')
      return
    }
    try {
      const stored = localStorage.getItem(`ce-category-${user.uid}`)
      setSavedCategory(stored || 'All')
    } catch {
      setSavedCategory('All')
    }
  }, [user])

  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />

  const vendor = vendors.find((v) => v.id === id)
  if (!vendor) return <p>Vendor not found</p>

  const activeCategory = searchParams.get('cat') || (user ? savedCategory : 'All')
  const categories = ['All', ...new Set(vendor.menu.map((item) => item.category))]
  const displayedMenu = activeCategory === 'All'
    ? vendor.menu
    : vendor.menu.filter((item) => item.category === activeCategory)

  function handleCategoryClick(cat) {
    if (user) {
      setSavedCategory(cat)
      try {
        localStorage.setItem(`ce-category-${user.uid}`, cat)
      } catch (err) {
        console.error('Failed to save category preference:', err)
      }
    }
    setSearchParams(cat === 'All' ? {} : { cat })
  }

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <div className="category-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid">
        {displayedMenu.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

export function OrdersPage() {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    try {
      const stored = localStorage.getItem('campuseats-orders')
      if (stored) setOrders(JSON.parse(stored))
    } catch {
      setOrders([])
    }
  }, [])

  if (orders.length === 0) {
    return (
      <section className="orders-page">
        <h2>My Orders</h2>
        <p className="muted">No orders placed yet.</p>
      </section>
    )
  }

  return (
    <section className="orders-page">
      <h2>My Orders</h2>
      <div className="orders-list">
        {orders.map((order, idx) => (
          <div key={idx} className="card order-card">
            <h3>Order #{idx + 1}</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Mahallah:</strong> {order.mahallah}</p>
            <p><strong>Pickup Time:</strong> {order.time}</p>
            <ul>
              {order.items?.map((line, i) => (
                <li key={i}>{line.qty}x {line.item?.name || line.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export function NotFoundPage() {
  return (
    <section className="not-found">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn">Back to Vendors</Link>
    </section>
  )
}