// src/components/Header.jsx
import { NavLink, useNavigate } from 'react-router'
import { useCart } from '../hooks/useCart.js'
import { useAuth } from '../hooks/useAuth.js'

function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>
      <nav className="nav">
        <NavLink to="/" end className="link">Vendors</NavLink>
        <NavLink to="/orders" className="link">My Orders</NavLink>
        <NavLink to="/cart" className="link cart">
          Cart <span className="badge">{count}</span>
        </NavLink>

        {user ? (
          <>
            <span className="user-name" style={{ color: '#fff', marginLeft: '0.5rem' }}>
              Hi, {user.displayName || user.email}
            </span>
            <button type="button" className="link" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login" className="link">Log in</NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header