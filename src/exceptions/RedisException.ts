import { BaseException } from "./BaseException";
export class RedisException extends BaseException {
    constructor(message: string = 'Erro ao conectar com o banco de dados', statusCode: number = 500, data: any = []) {
        super(message, statusCode, data);
    }
}