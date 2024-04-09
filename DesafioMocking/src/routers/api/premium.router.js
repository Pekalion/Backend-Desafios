import { Router } from 'express';
import {changeUserRole} from '../../controllers/users.controllers.js';
import {upgradeToPremium} from '../../controllers/users.controllers.js'


export const premiumRouter = Router();


premiumRouter.post('/:uid',upgradeToPremium);