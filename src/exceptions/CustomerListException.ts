import { BaseException } from "./BaseException";
export class CustomerListException extends BaseException {
    constructor(message: string = 'Erro ao listar clientes', statusCode: number = 500, data: any = []) {
        super(message, statusCode, data);
    }
}