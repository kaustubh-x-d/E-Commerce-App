import {Link} from 'react-router-dom'
import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData

  return (
    <li className="product-item">
      <Link to={`/products/${id}`} className="product-link">
        <div className="image-wrapper">
          <img src={imageUrl} alt={title} className="thumbnail" />
        </div>

        <div className="product-content">
          <h1 className="title" title={title}>
            {title}
          </h1>
          <p className="brand">by {brand}</p>

          <div className="product-details">
            <p className="price">₹{price}</p>

            <div className="rating-container" aria-label={`Rating ${rating}`}>
              <img
                src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                alt="star"
                className="star"
              />
              <span className="rating">{rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default ProductCard