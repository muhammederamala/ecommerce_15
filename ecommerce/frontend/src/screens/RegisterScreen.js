import React, {useState, useEffect} from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


//components
import Loader from '../components/Loader'
import Message from '../components/Message'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'


function RegisterScreen({history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()


    //split the portion after the redirect = ?
    const url = new URL(window.location.href);
    const search = url.search;
    const redirect = search ? search.split('=')[1] : '/'
    // const redirect = new URLSearchParams(window.locatin.search) ? URLSearchParams(window.locatin.search).split('=')[1] : '/'

    // User register is a userLoginReducer passed to store.
    const userRegister = useSelector(state => state.userRegister)
    const {error, loading, userInfo} = userRegister

    const navigate = useNavigate()

    useEffect(()=> {
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        if(password != ConfirmPassword){
            setMessage('Passwords do not match')
        }else{
            dispatch(register(name, email,password)) // register is the cart action export.
        }
    }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message  && <Message variant='danger' >{message}</Message>}
      {error && <Message variant='danger' >{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>

        <Form.Group controlId='name' className="mb-3">
            <Form.Label>Enter name</Form.Label>
            <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            >

            </Form.Control>
        </Form.Group>

        <Form.Group controlId='email' className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            >    
            </Form.Control>
        </Form.Group>

        <Form.Group controlId='passsword' className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            >
            </Form.Control>
            
        </Form.Group>

        <Form.Group controlId='passswordConfirm' className="mb-4">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
            type='password'
            placeholder='Confirm password'
            value={ConfirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            >
            </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className="mb-3">
            Register
        </Button>
      </Form>

        <Row className='py-3'>
            <Col>
            Already have an account ? 
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Sign in
            </Link>
            </Col>
        </Row>

      
    </FormContainer>
  )
}

export default RegisterScreen
