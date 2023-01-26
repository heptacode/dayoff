import mongoose from 'mongoose';

export function useMongoose(options?: mongoose.ConnectOptions) {
  const connectOptions = {
    serverSelectionTimeoutMS: process.env.VERCEL_ENV === 'development' ? 3000 : 10000,
    retryWrites: true,
    writeConcern: { w: 'majority' },
    ...options,
  } satisfies mongoose.ConnectOptions;

  const db = mongoose.connection;

  mongoose.set('strictQuery', true);
  mongoose.connect(process.env.MONGODB_URI!, connectOptions);

  db.on('error', error => {
    console.error(error);
    process.exit();
  });
  db.once('open', () => {
    console.info('MongoDB Connected');
  });

  return { db };
}
