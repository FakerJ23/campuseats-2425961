import { Outlet, useParams, useSearchParams } from 'react-router'
import { useVendors } from '../hooks/useVendors.js'
import { useCart } from '../hooks/useCart.js'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import VendorCard from '../components/VendorCard.jsx'
import MenuItemCard from '../components/MenuItemCard.jsx'
import { Loading, ErrorMessage } from '../components/Status.jsx'

export function Layout() {
  return (
    <>
      <Header />
      <main className="container"><Outlet /></main>
      <Footer />
    </>
  )
}

export function HomePage() {
  const { vendors, loading, error, reload } = useVendors()
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />
  
  return (
    <section>
      <h2 className="section-title">Today's vendors</h2>
      {vendors.map((v) => <VendorCard key={v.id} vendor={v} />)}
    </section>
  )
}

export function VendorPage() {
  const { id } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { vendors, loading, error, reload } = useVendors()
  
  if (loading) return <Loading />
  if (error) return <ErrorMessage message={error} onRetry={reload} />
  
  const vendor = vendors.find(v => v.id === id)
  if (!vendor) return <p>Vendor not found</p>

  // B4 Feature: Category state is now tracked in the URL!
  const activeCategory = searchParams.get('cat') || 'All'
  const categories = ['All', ...new Set(vendor.menu.map(item => item.category))]
  const displayedMenu = activeCategory === 'All' 
    ? vendor.menu 
    : vendor.menu.filter(item => item.category === activeCategory)

  return (
    <section>
      <h2 className="section-title">Menu: {vendor.name}</h2>
      <div className="category-filters">
        {categories.map((cat) => (
          <button 
            key={cat} 
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setSearchParams(cat === 'All' ? {} : { cat })}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="grid">
        {displayedMenu.map((item) => <MenuItemCard key={item.id} item={item} />)}
      </div>
    </section>
  )
}

export function OrdersPage() {
  const { orders } = useCart()
  if (orders.length === 0) return <p className="muted">No past orders.</p>
  return (
    <div className="card">
      <h2>My Orders</h2>
      {orders.map(o => (
        <div key={o.id} style={{borderBottom: '1px solid #eee', padding: '1rem 0'}}>
          <p><strong>{o.name}</strong> - Pick up at {o.pickupTime}</p>
          <p className="muted">Total: RM {o.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  )
}

export function NotFoundPage() {
  return <h2>404 - Page Not Found</h2>
}