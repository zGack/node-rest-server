import { Router } from 'express';
import { 
  usersPost, 
  usersDelete, 
  usersGet, 
  usersPut 
} from '../controllers/user.js';

export const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut)

router.post('/', usersPost)

router.delete('/', usersDelete)


