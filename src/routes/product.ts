import express from "express"
import {createProduct, getProducts, getProductById} from "../controller/product"
import { generateKey } from "crypto"

const productRoutes = express.Router()

productRoutes.post("/", createProduct)
productRoutes.get("/", getProducts)
productRoutes.get("/:id", getProductById)

export default productRoutes