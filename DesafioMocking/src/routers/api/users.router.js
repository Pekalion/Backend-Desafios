import { Router } from 'express';
import { registerUser, getCurrentUser, getAllUsers, passwordReset, passwordforgot} from '../../controllers/users.controllers.js';
import {passportLocalRegister,passportAuth} from '../../middlewares/passport.js'
import {uploadDocuments} from '../../controllers/users.controllers.js'
import multer from 'multer';
import { upload } from '../../middlewares/multer.js'


export const usersRouter = Router();

usersRouter.post('/',passportLocalRegister,registerUser);
usersRouter.get('/current',passportAuth,getCurrentUser);
usersRouter.get('/',passportAuth,getAllUsers); 
usersRouter.post('/forgotPassword',passwordforgot)
usersRouter.post('/resetPassword/:token',passwordReset);
usersRouter.post('/:uid/documents', upload.array('documents'), uploadDocuments);