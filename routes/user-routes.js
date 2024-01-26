import express from 'express';
import { signup, login } from '../controller/user-controller';

//obtaining all the router functionalities from express router
const router = express.Router();
router.post("/signup",signup);
router.post("/login", login);
export default router;