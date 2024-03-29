import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_RESET,
  MY_ORDERLIST_REQUEST,
  MY_ORDERLIST_SUCCESS,
  MY_ORDERLIST_FAIL,
  MY_ORDERLIST_RESET,
} from "../constants/Order-Constants"

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
export const orderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {}, loading: true },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,

        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAYMENT_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAYMENT_RESET:
      return {}
    default:
      return state
  }
}

export const MyOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case MY_ORDERLIST_REQUEST:
      return {
        loading: true,
      }
    case MY_ORDERLIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case MY_ORDERLIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case MY_ORDERLIST_RESET:
      return { orders: [] }

    default:
      return state
  }
}
