
//Interface cant be instantiated but classes can be instantiated
export interface IProduct{
    _id: string
    name: string
    description: string
    price: number
    image: string
    createdAt: string
    updatedAt: string
}

export interface IUser{
    name: string
    email: string
}

export interface IOrderItem {
    name: string
    quantity: number
    image: string
    price: number
    product: string
}

export interface IOrder{
    _id: string
    user: IUser
    orderItems: IOrderItem[]
    paymentDetails: {}
    paymentIntentId: string //from stripe
    totalPrice: number
    createdAt: string
    updatedAt: string
    paymentStatus: string
    deliveryAddress: string
}
  