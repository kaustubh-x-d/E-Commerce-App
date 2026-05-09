import {useEffect, useState} from 'react'
import ProductCard from '../product_icon'
import './index.css'
import Header from  "../header"

const sortOptions = [
  {id: 'PRICE_HIGH', label: 'Price: High to Low'},
  {id: 'PRICE_LOW', label: 'Price: Low to High'},
  {id: 'RATING_HIGH', label: 'Rating'},
]

const categories = [
  {id: '', label: 'All'},
  {id: 'electronics', label: 'Electronics'},
  {id: 'fashion', label: 'Fashion'},
  {id: 'home', label: 'Home'},
  {id: 'books', label: 'Books'},
]

const ratings = [
  {id: '', label: 'All Ratings'},
  {id: '4', label: '4★ & above'},
  {id: '3', label: '3★ & above'},
  {id: '2', label: '2★ & above'},
]

const Products = () => {
  const [productsList, setProductsList] = useState([])
  const [activeOptionId, setActiveOptionId] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState('')
  const [activeRatingId, setActiveRatingId] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)

      try {
        const response = await fetch(
          `http://127.0.0.1:5000/products?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`,
        )

        if (response.ok) {
          const fetchedData = await response.json()
          const formattedData = fetchedData.products.map(product => ({
            title: product.title,
            brand: product.brand,
            price: product.price,
            id: product.id,
            imageUrl: product.image_url,
            rating: product.rating,
          }))
          setProductsList(formattedData)
        } else {
          setProductsList([])
        }
      } catch (error) {
        setProductsList([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [activeOptionId, activeCategoryId, activeRatingId, searchInput])

  return (
    <div className="products-page">
      <Header/>
      <div className="products-header">
        <div>
          <h1 className="products-title">Products</h1>
          <p className="products-subtitle">Discover clean, modern picks curated for you.</p>
        </div>
      </div>

      <div className="products-toolbar">
        <div className="search-wrapper">
          <input
            type="search"
            className="search-input"
            placeholder="Search products..."
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <select
            className="filter-select"
            value={activeOptionId}
            onChange={e => setActiveOptionId(e.target.value)}
          >
            <option value="">Sort By</option>
            {sortOptions.map(option => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={activeCategoryId}
            onChange={e => setActiveCategoryId(e.target.value)}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={activeRatingId}
            onChange={e => setActiveRatingId(e.target.value)}
          >
            {ratings.map(rating => (
              <option key={rating.id} value={rating.id}>
                {rating.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="status-state">
          <p>Loading products...</p>
        </div>
      ) : productsList.length > 0 ? (
        <div className="products-grid">
          {productsList.map(eachItem => (
            <ProductCard key={eachItem.id} productData={eachItem} />
          ))}
        </div>
      ) : (
        <div className="status-state">
          <p>No products found.</p>
        </div>
      )}
    </div>
  )
}

export default Products