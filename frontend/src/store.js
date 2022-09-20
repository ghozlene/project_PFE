import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducer"
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducer"

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPaymentReducer,
  MyOrderListReducer,
} from "./reducers/orderReducer"

const reducer = combineReducers({
  //for products
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,

  //for users
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  //for orders
  orderDetails: orderDetailsReducer,
  orderCreate: orderCreateReducer,
  orderPayment: orderPaymentReducer,
  MyOrdersList: MyOrderListReducer,
})
const cartItemFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfoFromStorage = localStorage.getItem("USER_INFO")
  ? JSON.parse(localStorage.getItem("USER_INFO"))
  : null

const shippingAddressFromStorage = localStorage.getItem("SHIPPING_ADDRESS")
  ? JSON.parse(localStorage.getItem("SHIPPING_ADDRESS"))
  : {}

const initialState = {
  cart: {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
