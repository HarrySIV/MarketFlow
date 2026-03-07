require('dotenv').config();

import express from 'express';
import mongoose from 'mongoose';
import { HttpError } from './utility/http-error';

const accountRoutes = require('./routes/account-routes');

const server = express();

server.use(express.json());

// sets headers for API
server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

  next();
});

server.use('/api/account', accountRoutes);

server.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

const dbURL = process.env.DB;
const port = process.env.PORT;

mongoose.set('strictQuery', false);
mongoose
  .connect(`${dbURL}`)
  .then(() => {
    server.listen(port || 5001);
  })
  .catch((error) => {
    const err = new HttpError('mongodb service not connected', 502);
  });
