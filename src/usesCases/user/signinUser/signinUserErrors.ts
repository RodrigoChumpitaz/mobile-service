class SigninUserBadRequestError extends Error {
    constructor(message: string) {
        super(message);
    }
}

class SigninUserEmailNotFoundError extends Error {
    constructor() {
        super('User with this email not found.');
    }
}


export { SigninUserBadRequestError, SigninUserEmailNotFoundError };