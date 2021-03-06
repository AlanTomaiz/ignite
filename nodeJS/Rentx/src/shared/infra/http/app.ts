import 'reflect-metadata';
import express from 'express';
import swagger from 'swagger-ui-express';

import '../typeorm';
import '@shared/container';
import 'express-async-errors';

import swaggerConfig from '@config/swagger.json';
import { routes } from './routes';
import { HandleError } from './middlewares/HandleError';

const app = express();
app.use(express.json());
app.use('/documentation', swagger.serve, swagger.setup(swaggerConfig));
app.use(routes);
app.use(HandleError);

export { app };
