import { HttpStatusCode, HttpStatusCodeType } from '@root/router/dto.abstract';

export class CustomError extends Error {
    public readonly statusCode: HttpStatusCodeType;
    constructor(message: string, statusCode: HttpStatusCodeType = HttpStatusCode.internalError) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class UserError extends CustomError {
    constructor(message: string, statusCode: HttpStatusCodeType = HttpStatusCode.internalError) {
        super(message, statusCode);
    }
}

export class SystemError extends CustomError {
    constructor(message: string, statusCode: HttpStatusCodeType = HttpStatusCode.internalError) {
        super(message, statusCode);
    }
}

export class AccessError extends CustomError {
    constructor(message: string, statusCode: HttpStatusCodeType = HttpStatusCode.internalError) {
        super(message, statusCode);
    }
}
