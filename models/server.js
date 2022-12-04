import express from "express";
import cors from 'cors';
import { router } from "../routes/user.js";

export class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.usersPath = '/api/users';

    // Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();
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
    this.app.use(this.usersPath, router);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Server running at port: ', this.port);
    });
  }

}
