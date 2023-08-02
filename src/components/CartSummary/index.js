import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0

      cartList.forEach(each => {
        totalAmount += each.price * each.quantity
      })

      const totalItems = cartList.length

      return (
        <>
          <h1 className="total-amount">
            Order Total:<span className="amount"> Rs {totalAmount}</span>/-
          </h1>
          <p className="total-items">
            <span className="count">{totalItems}</span> Items in cart
          </p>
          <button type="button" className="check-out-button">
            Checkout
          </button>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
