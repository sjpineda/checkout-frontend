const ERROR = {
  MESSAGES: {
    NOT_FOUND: 'This route is not found on this server',
    SERVER_ERROR: 'Something went wrong. Server Error.',
    FORBIDDEN: 'You have no permissions to access these resources.',
    UNAUTHORIZED: 'You are not logged In. Please login.',
  },
  CODES: {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
}

export { ERROR }
