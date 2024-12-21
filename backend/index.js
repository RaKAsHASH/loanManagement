import express from 'express';
import cors from 'cors';
import db from './config/sequalize.js';
import routes from './router/routes.js';
import timeout from 'connect-timeout';

import dotenv from 'dotenv';

dotenv.config('./.env');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());

app.use('/', timeout('60s'), routes);

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Unable to connect to the database:', error);
});
