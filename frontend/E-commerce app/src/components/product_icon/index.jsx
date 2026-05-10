import {Link} from 'react-router-dom'
import {useCart} from '../../context/CartContext'
import './index.css'

const ProductCard = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price, id} = productData
  const {addToCart} = useCart()

  const onClickAddToCart = event => {
    event.preventDefault()
    event.stopPropagation()
    console.log('Add to Cart clicked', productData)
    addToCart(productData)
  }

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
                src="https://cdn-icons-png.flaticon.com/512/541/541415.png"
                alt="star"
                className="star"
              />
              <span className="rating">{rating}</span>
            </div>
          </div>
        </div>
      </Link>

      <button type="button" className="btn" onClick={onClickAddToCart}>
        Add to Cart
      </button>
    </li>
  )
}

export default ProductCard