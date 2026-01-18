import { useState, useEffect, useMemo } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'

function Products({ cart, addToCart }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('all')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products')
        const data = await res.json()
        setProducts(data.products)

        const unique = [...new Set(data.products.map(p => p.category))]
        setCategories(unique)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (category === 'all') return products
    return products.filter(p => p.category === category)
  }, [products, category])

  return (
    <>
      <div className='d-flex justify-content-end'>
        <p className='me-2 lead'>Filter by category</p>

        <Form.Select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="ll-select"
        >
          <option value='all'>All</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </Form.Select>
      </div>

      <Row className='mt-5 g-4'>
        {filteredProducts.length ? (
          filteredProducts.map(product => (
            <Col key={product.id} xs={12} sm={6} md={6} lg={4}>
              <Card className="ll-card">
                <Card.Img variant="top" src={product.images[0]} />
                <Card.Body>
                  <Card.Title style={{ minHeight: '48px' }}>
                    {product.title}
                  </Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <Button
                    className="btn ll-btn-primary me-1"
                    onClick={() => addToCart(product.id)}
                  >
                    {cart.some(item => item.id === product.id)
                      ? 'Added to the cart'
                      : 'Add to cart'}
                  </Button>

                  <Link
                    to='/cart'
                    className='btn ll-btn-accent'
                  >
                    Checkout
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className='lead'>Sorry, no products in inventory</p>
        )}
      </Row>
    </>
  )
}

export default Products