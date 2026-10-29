import { Link } from 'react-router'

function VendorCard({ vendor }) {
  return (
    <Link to={`/vendor/${vendor.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <article className="card vendor-card">
        <div className="thumb" aria-hidden="true">{vendor.name.charAt(0)}</div>
        <div>
          <h2>{vendor.name}</h2>
          <p className="muted">{vendor.location}</p>
          <p className="muted">Open: {vendor.openHours}</p>
          <span className={vendor.isOpen ? 'status open' : 'status closed'}>
            {vendor.isOpen ? 'Open now' : 'Closed'}
          </span>
        </div>
      </article>
    </Link>
  )
}
export default VendorCard