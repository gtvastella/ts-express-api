import { Router, Request, Response } from 'express';
import { CustomerController } from '../../controllers/CustomerController';
import "express-async-errors";
const customerListRouter = Router();
const customerController = new CustomerController();

customerListRouter.get('/list', async (req: Request, res: Response) => {
        await customerController.list(req, res);
});

export default customerListRouter;
