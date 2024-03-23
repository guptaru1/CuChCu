import { Request, Response } from "express"
import stripe from "stripe"
import Order from "../models/order"

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16",
  }) 

export const webhookHandler = async (request: Request, response: Response) => {
    try {
        const sig = request.headers["stripe-signature"] as string
        const event = stripeClient.webhooks.constructEvent(
          request.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        )
    

        if (event.type === "charge.succeeded"){
                    const charge = event.data.object as stripe.Charge
                    let paymentIntentId: string
                    if (typeof charge.payment_intent === "string") {
                        paymentIntentId = charge.payment_intent; // Assign the string value
                    } else {
                        paymentIntentId = charge.payment_intent.id; // Access the id property of PaymentIntent
                    }

                    //In order controller we saved the payment intent id from stripe so can use it to find the order
                    const order = await Order.findOne({
                        paymentIntentId: paymentIntentId,
                    })
                    if (order){
                        order.paymentStatus = "paid"
                        order.paymentDetails = charge
                        await order.save()
                    }

            } 
        response.send({received: true})  
    }
    catch(error){
            console.log("Error in stripe webhook", error)
            throw(error)
    }
}