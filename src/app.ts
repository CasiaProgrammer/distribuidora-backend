import 'reflect-metadata';

import dotenv = require('dotenv');

if (!process.env.DB_HOST) {
  dotenv.config({ path: `${__dirname}/../config/configuration.env` });
}

import express = require('express');
import cors from 'cors';
import { loadControllers } from 'awilix-express';
import loadContainer from './container';

const app: express.Application = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

loadContainer(app);
app.use(loadControllers('controllers/*.ts', { cwd: __dirname }));

export default app;