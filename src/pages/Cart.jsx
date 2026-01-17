import { useState, useEffect, useMemo } from "react"
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { ListGroup } from "react-bootstrap"
import { Link } from "react-router-dom"

function Cart({ cart, addToCart }) {
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
    return products.filter(p => cart.includes(p.id))
  }, [products, cart])

  const subTotal = useMemo(() => {
    return cartProducts.reduce((sum, p) => sum + p.price, 0)
  }, [cartProducts])

  return (
    <div>
      <h2 className="display-5">Your Loot!</h2>

      <Row className='mt-5'>
        {cartProducts.length ? cartProducts.map(product => (
          <Col key={product.id}>
            <Card style={{ width: '18rem', margin: '1em auto' }}>
              <Card.Img variant="top" src={product.images[0]} />
              <Card.Body>
                <Card.Title style={{ minHeight: '48px' }}>
                  {product.title}
                </Card.Title>
                <Card.Text>
                  ${product.price}
                </Card.Text>

                <Button>-</Button>
                <input type="text" />
                <Button>+</Button>

                <Button
                  variant="warning"
                  className='me-1'
                  onClick={() => addToCart(product.id)}
                >
                  {cart.includes(product.id)
                    ? 'Remove from cart'
                    : 'Add to cart'}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )) : (
          <p className='lead'>Oh no, your cart is empty. Add loot!</p>
        )}
      </Row>

      {Boolean(cart.length) && (
        <>
          <p className="lead">Does everything look correct?</p>
          <Card style={{ width: '18rem', margin: 'auto', textAlign: 'left' }}>
            <Card.Body>
              <Card.Title>Summary</Card.Title>
              <Card.Text>
                Total number of items: {cart.length}
              </Card.Text>
            </Card.Body>

            <ListGroup className="list-group-flush">
              <ListGroup.Item className="d-flex justify-content-between">
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
              <Card.Link className="btn btn-success" href="#">
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