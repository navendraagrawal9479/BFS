import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import treeRouters from './routes/tree.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(treeRouters);

const PORT = process.env.PORT || 6001;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Listening on PORT: ${PORT}. Connected to MongoDB`);
    });
  })
  .catch((err) => {
    console.log(`${err}, did not connect.`);
  });