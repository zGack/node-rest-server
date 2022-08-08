import { Role } from '../models/role.js';
import { User } from '../models/user.js';

export const isValidRole = async(role = '') => {
  const existRole = await Role.findOne({ role });

  if (!existRole) {
    throw new Error(`El rol ${role} no es un rol valido`)
  }
}

export const existEmail = async(email = '') => {

  const exist = await User.findOne({email});

  if (exist) {
    throw new Error(`Ya existe un usuario con ese correo`)
  }
}

export const existUserWithId = async(id) => {

  const exist = await User.findById(id);

  if (!exist) {
    throw new Error(`No existe un usuario con el id ${id}`)
  }

}