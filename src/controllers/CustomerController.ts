import { Request, Response } from 'express';
import { CustomerCreateSchema } from '../schemas/CustomerCreateSchema';
import { CustomerGetSchema } from '../schemas/CustomerGetSchema';
import { CustomerListSchema } from '../schemas/CustomerListSchema';
import { CustomerUpdateSchema } from '../schemas/CustomerUpdateSchema';
import { ResponseUtil, ResponseData } from '../util/responseUtil';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { Customer } from '../models/Customer';
import { CustomerCreateException, CustomerGetException, CustomerListException, CustomerUpdateException } from '../exceptions';
import { RedisDb } from '../cache/redis';
import { RabbitMq } from '../queue/rabbitmq';

export class CustomerController {

  async create(req: Request, res: Response) {

    const result = CustomerCreateSchema.safeParse(req.body);
    if (!result.success) {
      throw new CustomerCreateException('Dados inválidos', 400, result.error.issues);
    }

    const { nome: name, email, telefone: phone } = result.data;
    const customerRepo = new CustomerRepository();
    const createdCustomer: Customer = await customerRepo.create({ name, email, phone }); 
    const rabbitMq : RabbitMq = req.app.get('RabbitMq');
    rabbitMq.publish(JSON.stringify({ event: 'customer.created', data: { "uuid": createdCustomer.id } }));
    const successResponse: ResponseData = ResponseUtil.success('Cliente criado com sucesso', { "uuid": createdCustomer.id });
    return res.status(200).json(successResponse);
  }

  async get(req: Request, res: Response) {

    const result = CustomerGetSchema.safeParse(req.query);
    if (!result.success) {
      throw new CustomerGetException('Dados inválidos', 400, result.error.issues);
    }

    const { id } = result.data;
    const redisCache: RedisDb = req.app.get('redisCache');
    const cachedCustomer = await redisCache.getJson(id);
    if (cachedCustomer) {
      const successResponse: ResponseData = ResponseUtil.success('Cliente encontrado', cachedCustomer);
      return res.status(200).json(successResponse);
    }

    const customerRepo = new CustomerRepository();
    const foundCustomer: Customer | null = await customerRepo.findById(id);
    if (!foundCustomer) {
      throw new CustomerGetException('Cliente não encontrado', 404);
    }

    await redisCache.setJson(id, foundCustomer);
    const successResponse: ResponseData = ResponseUtil.success('Cliente encontrado', foundCustomer);
    return res.status(200).json(successResponse);
  }

  async list(req: Request, res: Response) {

    const result = CustomerListSchema.safeParse(req.query);
    if (!result.success) {
      throw new CustomerListException('Dados inválidos', 400, result.error.issues);
    }

    const { page, limit } = result.data;

    const cacheKey = `customers:page:${page}:limit:${limit}`;

    const redisCache: RedisDb = req.app.get('redisCache');
    const cachedCustomers = await redisCache.getJson(cacheKey);

    if (cachedCustomers) {
      const successResponse: ResponseData = ResponseUtil.success('Clientes encontrados', cachedCustomers);
      return res.status(200).json(successResponse);
    }

    const customerRepo = new CustomerRepository();
    const foundCustomers: Customer[] = await customerRepo.findAllPaginated({}, page, limit);

    if (!foundCustomers.length) {
      throw new CustomerListException('Nenhum cliente encontrado', 404);
    }

    await redisCache.setJson(cacheKey, foundCustomers);
    const successResponse: ResponseData = ResponseUtil.success('Clientes encontrados', foundCustomers);
    return res.status(200).json(successResponse);
  }

  async update(req: Request, res: Response) {

    const result = CustomerUpdateSchema.safeParse(req.body);
    if (!result.success) {
      throw new CustomerUpdateException('Dados inválidos', 400, result.error.issues);
    }

    const { id, nome: name, email, telefone: phone, ativo: enabled } = result.data;
    if (name === undefined && email === undefined && phone === undefined && enabled === undefined) {
      throw new CustomerUpdateException('Nenhum dado para atualizar', 400);
    }

    const customerRepo = new CustomerRepository();
    const foundCustomer: Customer | null = await customerRepo.findById(id);
    if (!foundCustomer) {
      throw new CustomerUpdateException('Cliente não encontrado', 404);
    }

    const updatedCustomer: Customer | null = await customerRepo.updateById(id, { name, email, phone, enabled });
    if (!updatedCustomer) {
      throw new CustomerUpdateException('Cliente não encontrado', 404);
    }

    const redisCache: RedisDb = req.app.get('redisCache');
    await redisCache.setJson(id, updatedCustomer);
    const rabbitMq : RabbitMq = req.app.get('RabbitMq');
    rabbitMq.publish(JSON.stringify({ event: 'customer.updated', data: { "uuid": updatedCustomer.id } }));
    const successResponse: ResponseData = ResponseUtil.success('Cliente atualizado', []);
    return res.status(200).json(successResponse);

  }

}
