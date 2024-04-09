import { Router, json, urlencoded } from 'express'
import { usersRouter } from './users.router.js'
import { metodosPersonalizados } from '../../middlewares/metodosPersonalizados.js'
import { sessionsRouter } from './sessions.router.js'
import { errorHandler } from '../../middlewares/errorHandler.js'
import { cartsRouter } from './carts.router.js'
import { premiumRouter } from './premium.router.js'
import {productosRouter} from './productos.router.js'
import { chatRouter } from './chat.router.js'
import swaggerUiExpress from 'swagger-ui-express'
import {specs} from '../../utils/swagger.js'




export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended:true}))

apiRouter.use(metodosPersonalizados)

apiRouter.use('/users', usersRouter)
apiRouter.use('/users/premium', premiumRouter);
apiRouter.use('/sessions', sessionsRouter)
apiRouter.use('/productos', productosRouter)
apiRouter.use('/carts', cartsRouter)
apiRouter.use('/chat', chatRouter)
apiRouter.use('/docs',swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
apiRouter.use(errorHandler)