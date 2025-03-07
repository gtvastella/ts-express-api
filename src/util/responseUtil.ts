export interface ResponseData {
    success: boolean;
    message: string;
    data?: any;
}

export const ResponseUtil = {
    success: (message: string, data?: any): ResponseData => {
        return {
            success: true,
            message,
            data,
        };
    },

    createResponse: (success: boolean, message: string, data?: any): ResponseData => {
        return {
            success,
            message,
            data,
        };
    }
};
