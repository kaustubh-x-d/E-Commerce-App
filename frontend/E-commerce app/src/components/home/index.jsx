import Header from "../header"
import "./index.css"
const Home = () => {
  return (
    <div className="home-page">
      <Header />
    
      <section className="home-hero">
        <div className="texttt">
        <div className="home-badge">Minimal • Modern • Fast Shopping</div>
        <h1 className="home-title">
          Welcome to <span>AMAFLIPZON</span>
        </h1>
        <p className="home-description">
          AMAFLIPZON is a clean and modern ecommerce experience built for discovering everyday essentials, lifestyle products, fashion, and tech in one place. Browse curated products, enjoy a smooth shopping flow, and shop with confidence through a simple, elegant interface.
        </p>

        <div className="home-actions">
          <a href="/products" className="home-button home-button-primary">
            Shop Now
          </a>
          <a href="/cart" className="home-button">
            View Cart
          </a>
        </div>
        </div>
        <div className="imgg"><img src="https://i.postimg.cc/nrH9PN32/Chat-GPT-Image-May-10-2026-02-33-55-PM.png" className="img" /></div>
      </section>
      
    
      <section className="home-gallery">
        <div className="home-image-card">
          <img
            className="home-image"
            src="https://plus.unsplash.com/premium_photo-1727173974066-65be41890afd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxpZmVzdHlsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Lifestyle collection"
          />
          <p className="home-image-caption">Lifestyle picks for everyday living</p>
        </div>

        <div className="home-image-card">
          <img
            className="home-image"
            src="https://images.unsplash.com/photo-1615220368123-9bb8faf4221b?q=80&w=1415&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Featured product"
          />
          <p className="home-image-caption">Featured products with a modern look</p>
        </div>

        <div className="home-image-card">
          <img
            className="home-image"
            src="https://plus.unsplash.com/premium_photo-1674718916687-911dd4e00ade?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHNhbXBsZXxlbnwwfHwwfHx8MA%3D%3D"
            alt="Fashion collection"
          />
          <p className="home-image-caption">Minimal fashion essentials</p>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-grid">
          <div>
            <h3 className="footer-title">AMAFLIPZON</h3>
            <p className="footer-text">
              A simple, stylish ecommerce platform for modern shopping.
            </p>
          </div>

          <div>
            <h3 className="footer-title">Contact</h3>
            <div className="footer-links">
              <a className="footer-link" href="mailto:support@amaflipzon.com">
                support@amaflipzon.com
              </a>
              <a className="footer-link" href="tel:+910000000000">
                +91 00000 00000
              </a>
            </div>
          </div>

          <div>
            <h3 className="footer-title">Links</h3>
            <div className="footer-links">
              <a className="footer-link" href="/products">Products</a>
              <a className="footer-link" href="/cart">Cart</a>
              <a className="footer-link" href="/orders">Orders</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2026 AMAFLIPZON. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home