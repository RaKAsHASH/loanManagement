import express from 'express';
import * as userController from '../controller/userController.js';
import * as loanController from '../controller/loanController.js';
import { HandleErrors } from '../middleware/errorHandler.js';
import verifyToken  from '../middleware/authenticate.js';

const router = express.Router();

router.post('/signup', HandleErrors(userController.signUp));
router.post('/login' ,HandleErrors(userController.logIn));
router.post('/loan' ,verifyToken,HandleErrors(loanController.createLoan));
router.post('/loan/:id' ,verifyToken,HandleErrors(loanController.updateLoan));
router.get('/loans' ,verifyToken,HandleErrors(loanController.getMyLoans));
router.get('/', verifyToken,HandleErrors(userController.test));

export default router;