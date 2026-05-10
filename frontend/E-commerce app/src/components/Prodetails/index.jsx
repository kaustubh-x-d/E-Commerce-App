import {useState, useEffect} from 'react'
import {useParams} from 'react-router'
import BeatLoader from 'react-spinners/BeatLoader'

import './index.css'

const BlogItemDetails = () => {
  const {id} = useParams()
  const apiUrl = `http://127.0.0.1:5000/products?id=${id}`

  const [blogItemDetails, setBlogItemDetails] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getBlogItemDetails = async () => {
      const response = await fetch(apiUrl)
      const fetchedData = await response.json()
      const formattedData = {
        title: fetchedData.title,
        imageUrl: fetchedData.image_url,
        content: fetchedData.content,
        avatarUrl: fetchedData.avatar_url,
        author: fetchedData.author,
      }

      setBlogItemDetails(formattedData)
      setIsLoading(false)
    }

    getBlogItemDetails()
  }, [])

  const renderBlogItemDetails = () => {
    const {title, imageUrl, content, avatarUrl, author} = blogItemDetails

    return (
      <div className="blog-item-details-container">
        <h1 className="title">{title}</h1>
        <div className="author-details-container">
          <img className="avatar" src={avatarUrl} alt={author} />
          <span className="name">{author}</span>
        </div>
        <img className="blog-img" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  const renderLoader = () => (
    <div className="loading-view-container">
      <BeatLoader />
    </div>
  )

  return (
    <div className="blog-details-container">
      {isLoading ? renderLoader() : renderBlogItemDetails()}
    </div>
  )
}

export default BlogItemDetails