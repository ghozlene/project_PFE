import React, { useEffect, useState } from "react"
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import axios from "axios"

import Alert from "@mui/material/Alert"
import Loader from "../Components/Loader"
import { Link } from "react-router-dom"
import { getOrderDetails, paymentOrder } from "../actions/orderAction"
import { ORDER_PAYMENT_RESET as REST } from "../constants/Order-Constants"

const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  const [sdkReady, setSdkReady] = useState(false)

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails
  const orderPayment = useSelector((state) => state.orderPayment)
  const { loading: loadingPay, sucess: successPay } = orderPayment
  const dispatch = useDispatch()
  if (!loading) {
    const addDecimal = (number) => {
      return (Math.round(number * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimal(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }
  useEffect(() => {
    const addpayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal")
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (!order || successPay) {
      dispatch({ type: REST })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addpayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [orderId, dispatch, successPay, order])

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult)
    dispatch(paymentOrder(orderId, paymentResult))
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Alert variant='filled' severity='error'>
      {error}
    </Alert>
  ) : (
    <>
      <h2>Order_ID:{order._id}</h2>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h1>Shipping</h1>
              <p>
                {" "}
                <strong> Name : </strong> {order.user.name}{" "}
              </p>
              <p>
                {" "}
                <strong>email : </strong>
                <a href={`mailto:${order.user.email}`}>
                  {order.user.email}
                </a>{" "}
              </p>
              <p>
                <strong>Address : </strong>
                {order.shippingAddress.address} ,{order.shippingAddress.city},
                {order.shippingAddress.postalCode} ,
                {order.shippingAddress.country},
              </p>
              {order.isDelivred ? (
                <Alert variant='filled' severity='success'>
                  Order has been Delivred on :{order.DelivredAt}
                </Alert>
              ) : (
                <Alert variant='filled' severity='info'>
                  order has not been Delivred yet
                </Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>Payment method:</h1>
              <p>
                <strong>Method :</strong>
                {console.log(order)}
                {order.paymentMethod.paymentMethod}{" "}
              </p>
              {order.isPaid ? (
                <Alert variant='filled' severity='success'>
                  Order has been paid on :{order.paidAt}
                </Alert>
              ) : (
                <Alert variant='filled' severity='info'>
                  order has not been paid yet
                </Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h1>Order Items </h1>

              {order.orderItems.length === 0 ? (
                <Alert variant='filled' severity='warning'>
                  your order is empty !
                </Alert>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}x ${item.price} =${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h1 style={{ textAlign: "center" }}>Order Summary</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                      style={{
                        color: "silver",
                        shape: "pill",
                        label: "pay",
                        height: 40,
                      }}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
