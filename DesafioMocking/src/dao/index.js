import { connectDb } from '../db/mongodb.js'

import { usersDAO } from './user.dao.js'
import { ProductDao } from './product.dao.js'
import { CartDao } from './cart.dao.js'
import { ChatDao } from './chat.dao.js'
import { TicketDao } from './ticket.dao.js'

await connectDb()

export const chatDao = new ChatDao()
export const cartDao = new CartDao()
export const productDao = new ProductDao()
export const usersDao = new usersDAO()
export const ticketDao = new TicketDao()