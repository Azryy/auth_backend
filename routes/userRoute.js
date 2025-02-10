import express from 'express'
import { login, Register } from '../controllers/userController.js';
import { approveAccount, handlingAccounts, rejectAccount, validAccount } from '../controllers/adminController.js';

const route = express.Router();

route.post('/register', Register);
route.post('/login', login)
route.get('/pending', handlingAccounts)
route.put('/approve/:id' ,approveAccount)
route.put('/reject/:id', rejectAccount)
route.get('/get/approve', validAccount)


export default route;