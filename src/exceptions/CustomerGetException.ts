import { BaseException } from "./BaseException";
export class CustomerGetException extends BaseException {
    constructor(message: string = 'Erro ao obter cliente', statusCode: number = 400, data: any = []) {
        super(message, statusCode, data);
    }
}