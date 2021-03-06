import { BaseError } from './baseError';

export class AuthError extends BaseError {
    constructor(errorString: string) {
        super(errorString, 100, AuthError.name);
    }
}