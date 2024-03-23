import * as dotenv from "dotenv"
dotenv.config()
import connectToDatabase from "./db"
import express from "express"
import { connect } from "http2"
import productRoutes from "./routes/product"
import Order from "./models/order"
import orderRoutes from "./routes/order"
import { webhookHandler } from "./webhook"
import cors from "cors"


const app = express()
app.use(cors())

connectToDatabase()

app.post("/webhook",express.raw({type:"application/json"}), webhookHandler )

app.use(express.json())


app.get("/ping", (request,response) => {
    response.send("pong")
})

app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

const PORT = process.env.PORT 


app.listen(PORT, () => {
    console.log("Server is up and running at ", PORT)
})