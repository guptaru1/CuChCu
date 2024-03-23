//CRUD OPERATIONS
import {Request, Response} from "express";
import Product from "../models/product"
import {IProduct} from "../types"

type CreateProductRequestType = Pick<IProduct , "image" | "name" | "description" | "price" >

export const createProduct = async (request: Request, response: Response) =>{
    try{
        const {image, name, price, description} : CreateProductRequestType = request.body

        const product = await Product.create({
            image, name, price, description 
        })
        response.send(product)
    }catch(error){
        console.log('product not created successfully')
        response.send({
            mesaage: "Something went wrong while creating the product"
        })
        throw(error)
    }
}

export const getProducts = async (request: Request, response: Response) => {
    try{
        const products = await Product.find({})
        //Send to front-end
        response.send(products)

    }catch(error){
        console.log("Error in getProduct")
        response.send({
            mesaage: "Something went wrong while fetching the product"
        })
        throw(error)
    }
}

export const getProductById = async(request: Request, response: Response) => {
    try{
        const {id} = request.params
        const product = Product.findById(id)
        response.send(product)
    }catch(error){
        console.log("Error in getProductById")
        response.send({
            mesaage: "Something went wrong while fetching the product with id"
        })
        throw(error)
    }

}
