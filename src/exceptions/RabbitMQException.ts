import { BaseException } from "./BaseException";
export class RabbitMQException extends BaseException {
    constructor(message: string = 'Erro ao conectar com a fila', statusCode: number = 500, data: any = []) {
        super(message, statusCode, data);
    }
}