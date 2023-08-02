import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachCart => eachCart.id !== id)
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachCart => {
      if (eachCart.id === id) {
        const addedQuantity = eachCart.quantity + 1
        return {
          id: eachCart.id,
          title: eachCart.title,
          brand: eachCart.brand,
          quantity: addedQuantity,
          price: eachCart.price,
          imageUrl: eachCart.imageUrl,
        }
      }
      return {
        id: eachCart.id,
        title: eachCart.title,
        brand: eachCart.brand,
        quantity: eachCart.quantity,
        price: eachCart.price,
        imageUrl: eachCart.imageUrl,
      }
    })
    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.find(eachCart => eachCart.id === id)
    if (updatedCartList.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === id) {
            const updateQuantity = eachCart.quantity - 1
            return {...eachCart, quantity: updateQuantity}
          }
          return eachCart
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  addCartItem = product => {
    const {cartList} = this.state
    const updatedCartList = cartList.find(
      eachCart => eachCart.id === product.id,
    )

    if (updatedCartList) {
      this.setState(prevenState => ({
        cartList: prevenState.cartList.map(eachCart => {
          if (updatedCartList.id === eachCart.id) {
            const updatedQuantity = eachCart.quantity + product.quantity
            return {...eachCart, quantity: updatedQuantity}
          }
          return eachCart
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
    //   TODO: Update the code here to implement addCartItem
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
