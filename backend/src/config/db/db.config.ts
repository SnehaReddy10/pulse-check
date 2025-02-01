import mongoose from 'mongoose';

export const dbConfig = {
  init: () => {
    mongoose
      .connect(process.env.MONGODB_CONNECTION_STRING || '')
      .then(() => {
        console.log('Connected to DB');
      })
      .catch((err) => {
        console.log('Failed connecting to DB', err);
      });
  },
};
