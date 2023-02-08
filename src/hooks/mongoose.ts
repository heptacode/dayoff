/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface NextApiRequestWithMongoose extends NextApiRequest {
  mongoose: typeof mongoose;
}

export declare type NextApiHandlerWithMongoose<T = any> = (
  req: NextApiRequestWithMongoose,
  res: NextApiResponse<T>
) => void | Promise<void>;

// @ts-ignore
let cachedMongoose = global.mongoose;

if (!cachedMongoose) {
  // @ts-ignore
  cachedMongoose = global.mongoose = { connected: undefined, promise: undefined } as any;
}

export async function useMongoose(options?: mongoose.ConnectOptions) {
  try {
    if (cachedMongoose.connected) {
      return cachedMongoose.connected;
    }
    if (!cachedMongoose.promise) {
      const connectOptions = {
        serverSelectionTimeoutMS: process.env.VERCEL_ENV === 'development' ? 3000 : 10000,
        retryWrites: true,
        writeConcern: { w: 'majority' },
        ...options,
      } satisfies mongoose.ConnectOptions;

      mongoose.set('strictQuery', true);
      cachedMongoose.promise = mongoose
        .connect(process.env.MONGODB_URI!, connectOptions)
        .then(m => m);
    }
    cachedMongoose.connected = await cachedMongoose.promise;
    return cachedMongoose.connected;
  } catch (error) {
    console.error(error);
  }
}

export function withMongoose(
  handler: NextApiHandlerWithMongoose,
  options?: mongoose.ConnectOptions
) {
  return async (req: NextApiRequestWithMongoose, res: NextApiResponse): Promise<void> => {
    try {
      const client = await useMongoose(options);

      (req as NextApiRequestWithMongoose).mongoose = client;
      return handler(req, res);
    } catch (error) {
      console.error(error);
    }
  };
}
