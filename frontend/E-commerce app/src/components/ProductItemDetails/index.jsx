import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useCart} from '../../context/CartContext'
import Header from "../header"
import './index.css'

const ProductItemDetails = () => {
  const {id} = useParams()
  const {addToCart} = useCart()

  

  const [productDetails, setProductDetails] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    const getProductItemDetails = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/products/${id}`,
        )

        const data = await response.json()

        if (!response.ok) {
          setErrorMsg(data.message || 'Failed to fetch product details')
          return
        }

        setProductDetails({
          title: data.title,
          imageUrl: data.image_url,
          brand: data.brand,
          price: data.price,
          rating: data.rating,
          category: data.category,
          description: data.description,
        })
      } catch (error) {
        setErrorMsg('Network error or backend not running')
      } finally {
        setIsLoading(false)
      }
    }

    getProductItemDetails()
  }, [id])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (errorMsg) {
    return <p>{errorMsg}</p>
  }

  if (!productDetails) {
    return <p>No product found</p>
  }

  const {
    title,
    imageUrl,
    brand,
    price,
    rating,
    category,
    description,
  } = productDetails

  const onClickAddToCart = event => {
    event.preventDefault()
    event.stopPropagation()
    console.log('Add to Cart clicked', productDetails)
    addToCart(productDetails)
  }

  return (
  <div className="product-details-page">
    <Header/>
    <div className="product-details-container">
      <div className="product-details-image-wrap">
        <img src={imageUrl} alt={title} className="product-image" />
      </div>

      <div className="product-details-content">
        <h1 className="product-details-title">{title}</h1>

        <div className="product-details-meta">
          <p><strong>Brand:</strong> {brand}</p>
          <p className="product-price">₹{price}</p>
          <p className="product-rating">Rating: {rating}</p>
          <p><strong>Category:</strong> {category}</p>
        </div>

        <p className="product-description">{description}</p>
        <button type="button" className="btn" onClick={onClickAddToCart}>
        Add to Cart
      </button>
      </div>
    </div>
  </div>
)
  
}

export default ProductItemDetails