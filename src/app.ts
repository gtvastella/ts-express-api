import express, { Request, Response } from 'express';
import customerCreateRouter from './routes/customer/create';
import customerGetRouter from './routes/customer/get';
import customerListRouter from './routes/customer/list';
import customerUpdateRouter from './routes/customer/update';
import { generalErrorMiddleware } from './util/middleware';
import { MongoDb } from './db/mongo';
import { RedisDb } from './cache/redis'
import { RabbitMq } from './queue/rabbitmq'
require('express-async-errors');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/customer', customerCreateRouter);
app.use('/customer', customerGetRouter);
app.use('/customer', customerListRouter);
app.use('/customer', customerUpdateRouter);

const mongoConnection: MongoDb = MongoDb.getInstance();
const redisCache: RedisDb = RedisDb.getInstance();
const rabbitMq: RabbitMq = RabbitMq.getInstance();
mongoConnection.connect();
app.set('RabbitMq', rabbitMq);
app.set('redisCache', redisCache);

app.use(generalErrorMiddleware);
export default app;