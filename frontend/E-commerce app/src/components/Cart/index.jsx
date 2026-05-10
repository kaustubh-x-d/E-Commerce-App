import {useCart} from '../../context/CartContext'
import Header from '../header'
import './index.css'

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart()

  return (
    <div className="cart-page">
  <Header />
  <div className="cart-header">
    <h1 className="cart-title">Cart</h1>
    <p className="cart-subtitle">Review your selected items before checkout.</p>
  </div>

  {cartItems.length === 0 ? (
    <p className="cart-empty">Your cart is empty</p>
  ) : (
    <div className="cart-list">
      {cartItems.map(item => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-info">
            <p className="cart-item-name">{item.name}</p>
            <p className="cart-item-meta">Price: ₹{item.price}</p>
            <p className="cart-item-meta">Quantity: {item.quantity}</p>
          </div>

          <div className="cart-item-actions">
            <div className="qty-group">
              <button className="qty-button" onClick={() => decreaseQuantity(item.id)}>-</button>
              <button className="qty-button" onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <button className="remove-button" onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  )}

  {cartItems.length > 0 && (
    <div className="clear-cart-wrap">
      <button className="clear-cart-button" onClick={clearCart}>Clear Cart</button>
    </div>
  )}
</div>
  )
}

export default Cart