import { Router } from 'express';
import { create, login } from '../controllers/user.controller';

const router = Router();

router.post('/', create);
router.get('/login', login);

export default router;
