import { Request, Response, NextFunction } from 'express';
import { ResponseUtil, ResponseData } from './responseUtil';
import { BaseException } from '../exceptions';
require('express-async-errors');

export async function generalErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction): Promise<void> {
    if (err instanceof SyntaxError && 'body' in err) {
        const errorResponse: ResponseData = ResponseUtil.createResponse(false, 'Corpo de requisição inválido', []);
        res.status(400).json(errorResponse);
        return;
    }

    if (err instanceof BaseException) {
        const errorResponse: ResponseData = ResponseUtil.createResponse(false, err.message, err.data);
        res.status(err.statusCode).json(errorResponse);
        return;
    }

    if (err instanceof Error) {
        const errorResponse: ResponseData = ResponseUtil.createResponse(false, 'Internal Server Error', []);
        res.status(500).json(errorResponse);
        return;
    }

    next(err);
}
