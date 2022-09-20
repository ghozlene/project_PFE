import express from "express"
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js"
import { protect, isAdmin } from "../middleware/authmiddleware.js"
const router = express.Router()
router.route("/").post(registerUser).get(protect, isAdmin, getAllUser)
router.post("/login", authUser)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
//deleting and edting a user (Admin)
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser)
export default router
