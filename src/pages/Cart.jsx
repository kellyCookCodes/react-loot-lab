import { useState, useEffect, useMemo } from "react"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

function Cart({ cart, addToCart, decreaseQty, removeFromCart }) {
  const [products, setProducts] = useState([])

  const deliveryCharge = 10

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        setProducts(data.products)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])

  const cartProducts = useMemo(() => {
    return products.filter(p => cart.some(item => item.id === p.id))
  }, [products, cart])

  const subTotal = useMemo(() => {
    return cartProducts.reduce((sum, p) => {
      const cartItem = cart.find(item => item.id === p.id)
      return sum + p.price * (cartItem?.qty || 0)
    }, 0)
  }, [cartProducts, cart])

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div>
      <h2 className="display-5">Your <span className="ll-brand-accent">Loot!</span></h2>

      <Row className='mt-5'>
        {cartProducts.length ? cartProducts.map(product => {

          const cartItem = cart.find(item => item.id === product.id)

          return (
            <Col key={product.id} xs={12} sm={6} md={6} lg={4}>
              <Card className="ll-card ll-cart-card">
                <Card.Img variant="top" src={product.images[0]} />
                <Card.Body>
                  <Card.Title style={{ minHeight: '48px' }}>
                    {product.title}
                  </Card.Title>

                  <Card.Text>${product.price}</Card.Text>

                  <div className="ll-qty">
                    <Button
                      className="ll-qty-btn"
                      onClick={() => decreaseQty(product.id)}
                    >
                      -
                    </Button>

                    <input
                      className="ll-qty-input"
                      type="text"
                      value={cartItem?.qty || 1}
                      readOnly
                    />

                    <Button
                      className="ll-qty-btn"
                      onClick={() => addToCart(product.id)}
                    >
                      +
                    </Button>
                  </div>

                  <Button
                    className="ll-btn-primary me-1"
                    onClick={() =>
                      cart.some(item => item.id === product.id)
                        ? removeFromCart(product.id)
                        : addToCart(product.id)
                    }
                  >
                    {cart.some(item => item.id === product.id)
                      ? 'Remove from cart'
                      : 'Add to cart'}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        }) : (
          <p className='lead'>Oh no, your cart is empty. Add loot!</p>
        )}
      </Row>

      {Boolean(cart.length) && (
        <>
          <p className="lead mt-4">Please insure everything looks correct before proceeding to billing.</p>
          <Card className="ll-summary-card">
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <Card.Text>
                Total number of items: {totalItems}
              </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item
                className="ll-summary-item d-flex justify-content-between"
              >
                <span>Subtotal:</span>
                <span>${subTotal.toFixed(2)}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <span>Delivery charges:</span>
                <span>${deliveryCharge.toFixed(2)}</span>
              </ListGroup.Item>

              <ListGroup.Item className="d-flex justify-content-between">
                <span>Total:</span>
                <span>${(subTotal + deliveryCharge).toFixed(2)}</span>
              </ListGroup.Item>
            </ListGroup>

            <Card.Body style={{ textAlign: 'center' }}>
              <Card.Link className="ll-btn-accent" href="#">
                Proceed to billing
              </Card.Link>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  )
}

export default Cart