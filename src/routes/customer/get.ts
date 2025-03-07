import { Router, Request, Response } from 'express';
import { CustomerController } from '../../controllers/CustomerController';
import "express-async-errors";
const customerGetRouter = Router();
const customerController = new CustomerController();

customerGetRouter.get('/get', async (req: Request, res: Response) => {
        await customerController.get(req, res);
});

export default customerGetRouter;
