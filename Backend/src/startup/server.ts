import { connect } from './db';
import { config } from '../config/dev';
import express from 'express';
import routes from './routes';

export const app = express();
routes(app);


export const start = async () => {
    try {
      await connect();
      const port = process.env.port || 3000;
      app.listen(port, () => {
        console.log(`REST API on http://${config.host}:${port}/api`);
      })
    } catch (e) {
      console.error(e);
    }
  }