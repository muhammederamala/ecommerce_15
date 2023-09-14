import React, {useState, useEffect} from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


//components
import FormContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen() {
  
  const cart = useSelector(state => state.cart)
  const {shippingAddress} = cart

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const navigate = useNavigate()

  const submitHandler = (e) =>{
    e.preventDefault()
    console.log("Submitted")
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    navigate('/payment')
  }
  

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler} >

      <Form.Group controlId='address' className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address ? address : ''}
            onChange={(e) => setAddress(e.target.value)}
            required
            >

            </Form.Control>
        </Form.Group>

        <Form.Group controlId='city' className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter City'
            value={city ? city : ''}
            onChange={(e) => setCity(e.target.value)}
            required
            >

            </Form.Control>
        </Form.Group>


        <Form.Group controlId='postalCode' className="mb-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode ? postalCode : ''}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            >

            </Form.Control>
        </Form.Group>


        <Form.Group controlId='country' className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
            type='text'
            placeholder='Enter Country'
            value={country ? country : ''}
            onChange={(e) => setCountry(e.target.value)}
            required
            >

            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>

      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
