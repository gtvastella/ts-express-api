import { Router, Request, Response } from 'express';
import { CustomerController } from '../../controllers/CustomerController';
import "express-async-errors";
const customerUpdateRouter = Router();
const customerController = new CustomerController();

customerUpdateRouter.post('/update', async (req: Request, res: Response) => {
        await customerController.update(req, res);
});

export default customerUpdateRouter;
