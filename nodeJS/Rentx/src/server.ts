import 'reflect-metadata';
import express from 'express';
import swagger from 'swagger-ui-express';

import './database';
import './shared/container';
import 'express-async-errors';

import swaggerConfig from './swagger.config.json';
import { routes } from './routes';
import { HandleError } from './middlewares/HandleError';

const PORT = 3333;
const app = express();

app.use(express.json());
app.use('/documentation', swagger.serve, swagger.setup(swaggerConfig));
app.use(routes);
app.use(HandleError);

app.listen(PORT, () => console.log(`Server start on port ${PORT}!`));
