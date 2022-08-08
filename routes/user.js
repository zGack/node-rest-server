import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos.js';
import { 
  usersPost, 
  usersDelete, 
  usersGet, 
  usersPut 
} from '../controllers/user.js';
import { existEmail, existUserWithId, isValidRole } from '../helpers/db-validators.js';

export const router = Router();

router.get('/', usersGet);

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existUserWithId),
  check('role').custom(isValidRole),
  validarCampos,
],usersPut)

router.post('/', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'Debe ingresar una password').not().isEmpty(),
  check('email', 'Debe ingresar un correo valido').isEmail(),
  check('email').custom(existEmail),
  // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
  check('role').custom(isValidRole),
  validarCampos,
], usersPost)

router.delete('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(existUserWithId),
  validarCampos,
],usersDelete)


