class CreateUserBadRequestError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export { CreateUserBadRequestError };