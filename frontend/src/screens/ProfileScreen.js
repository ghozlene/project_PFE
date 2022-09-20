import React, { useEffect, useState } from "react"
import LinearProgress from "@mui/material/LinearProgress"
import { withStyles } from "@material-ui/styles"
import CircularProgress from "@mui/material/CircularProgress"
import { Form, Button, Row, Col, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Alert from "@mui/material/Alert"

import { getUserDetails, updateUserProfile } from "../actions/userAction"
import { myListOrders } from "../actions/orderAction"
import { LinkContainer } from "react-router-bootstrap"
const ProfileScreen = ({ history }) => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  const MyOrdersList = useSelector((state) => state.MyOrdersList)
  const { loading: loadingOrders, error: errorOrders, orders } = MyOrdersList

  useEffect(() => {
    const timer = setInterval(() => {
      if (!userInfo) {
        history.push("/login")
      } else {
        if (!user.name) {
          dispatch(getUserDetails("profile"))
          dispatch(myListOrders())
          clearInterval(timer)
        } else {
          setName(user.name)
          setEmail(user.email)
        }
      }
    }, 500)
  }, [history, dispatch, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage("invalid password ")
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  const [progress, setProgress] = useState(0)

  const StyledLinearProgress = withStyles({
    colorPrimary: {
      backgroundColor: "black",
    },
    barColorPrimary: {
      backgroundColor: "bleu",
    },
  })(LinearProgress)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100 && loadingOrders) {
          return 0
        }
        const diff = Math.random() * 200
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)
    return () => {
      clearInterval(timer)
    }
  }, [loadingOrders])

  return (
    <Row>
      <Col md={3}>
        <h2>Update your porifle </h2>
        {message && (
          <Alert variant='filled' severity='error'>
            {message}
          </Alert>
        )}
        {error && (
          <Alert variant='filled' severity='error'>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant='filled' severity='success'>
            updated with success
          </Alert>
        )}
        {loading && (
          <CircularProgress variant='indeterminate' value={100} size='5rem' />
        )}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email-address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter your password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}></Form.Control>
          </Form.Group>

          <Form.Group controlId='ConfirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Ordres</h2>
        {loadingOrders ? (
          <StyledLinearProgress variant='determinate' value={progress} />
        ) : errorOrders ? (
          <Alert variant='filled' severity='error'>
            {errorOrders}
          </Alert>
        ) : (
          <Table
            striped
            bordered
            hover
            responsive
            className='table-sm'
            size='sm'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Date</th>

                <th>Total</th>
                <th>Paid</th>
                <th>Delivred</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className='fas fa-check'
                        style={{ color: "green" }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivred ? (
                      <i class='fas fa-check' style={{ color: "green" }}></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='outline-primary'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default ProfileScreen
