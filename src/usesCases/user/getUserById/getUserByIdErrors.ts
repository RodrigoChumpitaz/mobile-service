class GetUserByIdNotFoundError extends Error {
  constructor() {
    super('User not found.');
  }
}

class GetUserByIdBadRequestError extends Error {
  constructor(message) {
    super(message);
  }
}

export { GetUserByIdNotFoundError, GetUserByIdBadRequestError };