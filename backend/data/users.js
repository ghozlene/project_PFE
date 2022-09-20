import bcrypt from "bcryptjs"
const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Achref",
    email: "achref@achref.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "ahmed",
    email: "ahmed@ahmed.com",
    password: bcrypt.hashSync("123456", 10),
  },
]
export default users
