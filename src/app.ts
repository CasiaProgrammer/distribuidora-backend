import 'reflect-metadata';

process.env.NODE_ENV = process.env.NODE_ENV || 'configuration';
process.env.APP_ENV = process.env.APP_ENV || 'configuration';

import dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../config/${process.env.APP_ENV}.env` });

import express = require('express');
import cors from 'cors';
import { loadControllers } from 'awilix-express';
import loadContainer from './container';

const app: express.Application = express();
app.use(cors());
app.use(express.json());

loadContainer(app);
app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export default app;