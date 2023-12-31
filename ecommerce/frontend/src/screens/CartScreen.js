import React, { useEffect } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'




//components
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'
 



function CartScreen(location) {

  const { id } = useParams()
  const parameter = new URLSearchParams(window.location.search)
  const qty = parameter.get("qty") ?  parseInt(parameter.get("qty")) : 1

  const dispatch =  useDispatch()

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart
  console.log('cartItems:', cartItems)

  useEffect (() =>{
    if(id){
      dispatch(addToCart(id, qty))
    }
  },[dispatch, id, qty]) 

  // remove cart elements
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  //checkout function.
  const navigate = useNavigate()
  const checkoutHandler = () => {
    navigate('/shipping')
  }

  return (
    <Row>
      <Col md={8} >
        <h1>Shopping Cart</h1>
        { cartItems.length === 0 ? (
          <Message variant='info' >
            Your cart is empty ! <Link to= '/' >Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush' >
            {cartItems.map(item => (
              <ListGroup.Item key={item.product} >
                <Row>
                  <Col md={2} >
                    <Image src={item.image} alt={item.name} fluid rounded/>
                  </Col>
                  <Col md={3} >
                    <Link to= {`/product/${item.product}`} >{item.name}</Link>
                  </Col>
                  <Col md={2}>
                  ${item.price}
                  </Col>
                  <Col>
                  <Form.Control 
                    as="select"
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                  >

                  {
                    [...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value= {x + 1} >
                        {x + 1}
                      </option>
                      ) )
                  }

                  </Form.Control>
                </Col>
                <Col md={1}>
                  <Button
                  type='button'
                  variant='light'
                  onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className='fas fa-trash' ></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) }          
    </Col>

    <Col md={4}>
    <Card>
      <ListGroup variant='flush'>
        <ListGroup.Item>
          <h2>
            Subtotal ({cartItems.reduce((acc,item) => acc + item.qty, 0)}) items
          </h2>
          ${cartItems.reduce((acc,item) => acc + item.qty * item.price, 0).toFixed(2)}
        </ListGroup.Item>
      </ListGroup>

      <ListGroup.Item>
        <Button
        type='button'
        className='btn-block'
        disabled={cartItems.length === 0}
        onClick={checkoutHandler}
        >
          PROCEED TO CHECKOUT
        </Button>
      </ListGroup.Item>

    </Card>
    </Col>

  </Row>
  )
}

export default CartScreen
