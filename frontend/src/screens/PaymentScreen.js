import React, { useState } from "react"

import { Form, Button, Col, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../Components/FormContainer"
import CheckOutSteps from "../Components/CheckOutSteps"
import { savePaymentMethod } from "../actions/CartAction"

const PaymentScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push("/shipping")
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()

  const submitHandler = (x) => {
    x.preventDefault()
    dispatch(savePaymentMethod({ paymentMethod }))
    history.push("/placeorder")
  }

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h2>Payment Method</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label as='legend' column sm={6}>
            Select payment method :
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type='radio'
              label='Paypal or Credit Card'
              name='paymentMethod'
              id='Paypal'
              value='Paypal'
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <Form.Check
              type='radio'
              label='Stripe'
              name='paymentMethod'
              id='Stripe'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default PaymentScreen
