import {response, request} from 'express';

export const usersGet = (req = request, res = response) => {
  
  const {q, nombre, api_key} = req.query;

  res.json({
    msg: 'get API - controlador',
    q,
    nombre,
    api_key
  })
}

export const usersPost = (req, res = response) => {

  const {name, age} = req.body;

  res.json({
    msg: 'post API - controlador',
    name,
    age,
  })
}

export const usersPut = (req, res = response) => {

  const {id} = req.params;

  res.json({
    msg: 'put API - controlador',
    id
  })
}

export const usersDelete = (req, res = response) => {

  const {id} = req.params;

  res.json({
    msg: 'delete API - controlador',
    id
  })
}