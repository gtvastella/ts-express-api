import { Router, Request, Response } from 'express';
import { CustomerController } from '../../controllers/CustomerController';
import "express-async-errors";
const customerCreateRouter = Router();
const customerController = new CustomerController();

customerCreateRouter.post('/create', async (req: Request, res: Response) => {
        await customerController.create(req, res);
});

export default customerCreateRouter;
