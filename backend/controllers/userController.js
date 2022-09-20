import User from "../models/userModel.js"
import AsyncHandler from "express-async-handler"
import generateToken from "../secrets/generateToken.js"

//@description : Register new user
//@route : POST api/users
//@access: Public
const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error("user Already exists")
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("invalid user DATA !")
  }
})

const authUser = AsyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

//@description : Get user profile
//@route : GET /api/users/profile
//@access for this route : Private
const getUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    {
      new Error("user Not Found!")
    }
  }
})

//@description : PUT update user profile
//@route : PUT /api/users/profile
//@access for this route : Private
const updateUserProfile = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    })
  } else {
    res.status(404)
    {
      new Error("user Not Found!")
    }
  }
})

//@description : Get users
//@route : GET /api/users
//@access for this route : Private/Admin
const getAllUser = AsyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

//@description : Delete a user
//@route : DELETE /api/users/:id
//@access for this route : Private/Admin
const deleteUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    await user.remove()
    res.json({ message: "user has been removed" })
  } else {
    res.status(401)
    throw new Error("user not exist")
  }
})

//@description : Get user by his ID
//@route : GET /api/users/:id
//@access for this route : Private/Admin
const getUserById = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user) {
    res.json(user)
  } else {
    res.status(404)
    {
      new Error("user Not Found!")
    }
  }
})

//@description : update user
//@route : PUT /api/users/:id
//@access for this route : Private/Admin
const updateUser = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updateUser = await user.save()
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
    })
  } else {
    res.status(404)
    {
      new Error("user Not Found!")
    }
  }
})

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
}
