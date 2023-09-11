import React, {useState, useEffect} from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'


//components
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({history}) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()


  // User details is a userDetailsReducer passed to store.
  const userDetails = useSelector(state => state.userDetails)
  const {error, loading, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile

  const navigate = useNavigate()

  useEffect(()=> {
      if(!userInfo){
          navigate('/login')
      }
      else{
        if(!userInfo || !user.name || success){
          dispatch({ type:USER_UPDATE_PROFILE_RESET })
          // profile is passed as a string and recieved as an id in the user action to fill in the url
          dispatch(getUserDetails('profile'))
        }
        else{
          setName(user.name)
          setEmail(user.email)
        }
      }
  },[dispatch, userInfo, user, success])

  const submitHandler = (e) => {
      e.preventDefault()

      if(password != ConfirmPassword){
          setMessage('Passwords do not match')
      }else{
          dispatch(updateUserProfile({
            'id':user._id,
            'name':name,
            'email':email,
            'password':password
          }))
          setMessage('')
      }
  }


  return (
    <div>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
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
              >
              </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className="mb-3">
              Update
            </Button>
          </Form>

        </Col>
        <Col md={9}>
          <h2>My orders</h2>
        </Col>
      </Row>
    </div>
  )
}

export default ProfileScreen
