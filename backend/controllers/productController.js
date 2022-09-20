import Product from "../models/productModel.js"
import AsyncHandler from "express-async-handler"

const getProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({})

  res.json(products)
})

const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product Not Found !!")
  }
})

//@desc : Delete Product
//@route: DELETE /api/products/:id
//@access: private/admin
const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: "Product has been removed" })
  } else {
    res.status(404)
    throw new Error("Product Not Found !!")
  }
})

//@desc : create Product
//@route: POST /api/products
//@access: private/admin
const createProduct = AsyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample name",
    price: "0",
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample Discription",
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

//@desc : update Product
//@route: PUT /api/products/:id
//@access: private/admin
const updateProduct = AsyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("product not found")
  }
})
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
}
