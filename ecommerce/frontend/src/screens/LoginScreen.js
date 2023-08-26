import React, {useState, useEffect} from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


//components
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'



function LoginScreen({history}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()


    //split the portion after the redirect = ?
    const url = new URL(window.location.href);
    const search = url.search;
    const redirect = search ? search.split('=')[1] : '/'
    // const redirect = new URLSearchParams(window.locatin.search) ? URLSearchParams(window.locatin.search).split('=')[1] : '/'

    // User login is a userLoginReduces passed to store.
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    const navigate = useNavigate()

    useEffect(()=> {
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password)) // think login is the cart action export.
    }


  return (
    <FormContainer>
      <h1>Sign in</h1>
      {error && <Message variant='danger' >{error}</Message>}
      {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='passsword' className="mb-4">
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
