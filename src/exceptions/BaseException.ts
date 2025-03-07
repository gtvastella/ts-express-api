export class BaseException extends Error {
    statusCode: number = 500;
    data : any = null;
    constructor(message: string, statusCode: number = 500, data: any = []) {
        super(message);
        this.statusCode = statusCode;
        this.data = data;
    }

}