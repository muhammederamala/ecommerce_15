import React, {useState, useEffect} from 'react'
import { Link, redirect } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


//components
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'



function LoginScreen({location, history}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const url = new URL(window.location.href);
    const search = url.search;


    const redirect = location.search ? location.search.split('=')[1] : '/';

    

    // const redirect = new URLSearchParams(window.locatin.search) ? URLSearchParams(window.locatin.search).split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        console.log('Submitted')
    }


  return (
    <FormContainer>
      <h1>Sign in</h1>

        <Form onClick={submitHandler}>
            <Form.Group controlId='email' className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='passsword' className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mb-3">
                Sign in
            </Button>

        </Form>

        <Row className='py-3'>
            <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
            </Col>
        </Row>

    </FormContainer>
  )
}

export default LoginScreen
