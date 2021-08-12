import { HttpException, HttpStatus } from '@nestjs/common';

export class DbError extends HttpException {
    constructor(
        message?: string | Record<string, any>,
        code?: string,
        status?: HttpStatus,
    ) {
        super(
            { message: message ?? 'Error in Database', code: code ?? 'ERROR_IN_DB' },
            status ?? HttpStatus.INTERNAL_SERVER_ERROR,
        );
        this.name = 'DbError';
    }
}