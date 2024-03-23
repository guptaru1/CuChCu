import mongoose, { Schema } from "mongoose";
import {IProduct} from "../types"

const productSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price :{
        type: Number,
        required: true,
    }
},
{
    //Managed by mongoose
    timestamps: true,
}

)

const product = mongoose.model("Product", productSchema)
export default product