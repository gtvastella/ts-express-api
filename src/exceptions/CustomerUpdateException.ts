import { BaseException } from "./BaseException";
export class CustomerUpdateException extends BaseException {
    constructor(message: string = 'Erro ao atualizar cliente', statusCode: number = 500, data: any = []) {
        super(message, statusCode, data);
    }
}