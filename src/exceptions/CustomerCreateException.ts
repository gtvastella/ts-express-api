import { BaseException } from "./BaseException";
export class CustomerCreateException extends BaseException {
    constructor(message: string = 'Erro ao criar cliente', statusCode: number = 400, data: any = []) {
        super(message, statusCode, data);
    }
}