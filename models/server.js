import express from "express";
import cors from 'cors';

import { user_router } from "../routes/user.js";
import { auth_router } from "../routes/auth.js";
import { categories_router } from "../routes/categories.js";

import { dbConnection } from "../db/config.js";
import { products_router } from "../routes/products.js";
import { search_router } from "../routes/search.js";

export class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT; // puerto de la pp

    // Objeto que contiene las rutas de la app
    this.paths = {
      auth:       '/api/auth',
      users:      '/api/users',
      categories: '/api/categories',
      products:   '/api/products',
      search:     '/api/search'
    }

    // Conectar a la db
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();
  }

  // Conexion a la base de datos
  async conectarDB() {
    await dbConnection();
  }

  middlewares() {

    // CORS
    this.app.use(cors());

    // Lectura y parseo del body
    this.app.use(express.json());
    
    // Directorio publico
    this.app.use(express.static('public'));
  }

  routes() {
    // Rutas de la app
    this.app.use(this.paths.auth, auth_router);
    this.app.use(this.paths.users, user_router);
    this.app.use(this.paths.categories, categories_router);
    this.app.use(this.paths.products, products_router);
    this.app.use(this.paths.search, search_router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running at port: ', this.port);
    });
  }

}