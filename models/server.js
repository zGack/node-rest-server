import express from "express";
import cors from 'cors';

import { dbConnection } from "../db/config.js";
import fileUpload from "express-fileupload";

import { user_router,
         auth_router,
         categories_router,
         products_router,
         search_router,
         uploads_router} from "../routes/index.js";

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
      search:     '/api/search',
      uploads:    '/api/uploads'
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

    // FileUpload - Carga de archivos
    this.app.use(fileUpload({
      useTempFiles : true,
      tempFileDir : '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    // Rutas de la app
    this.app.use(this.paths.auth, auth_router);
    this.app.use(this.paths.users, user_router);
    this.app.use(this.paths.categories, categories_router);
    this.app.use(this.paths.products, products_router);
    this.app.use(this.paths.search, search_router);
    this.app.use(this.paths.uploads, uploads_router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running at port: ', this.port);
    });
  }

}