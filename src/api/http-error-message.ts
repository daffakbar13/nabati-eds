export const HTTP_ERROR = 'ERROR'
export const HTTP_LOGIN_ERROR = 'Incorrect Username or password , please login again'
export const HTTP_SESSION_EXPIRED = 'Expired session, please login again'
export const HTTP_UNAUTHORIZED_ACTION = 'Your Action Unauthorized!'
export const HTTP_INTERNAL_SERVER_ERROR = 'Internal server error'
export const HTTP_UNPROCESSED_REQUEST = 'Request can not be processed'
export const HTTP_UNKNOWN_ERROR = 'Unknown Error'
export const HTTP_NETWORK_ERROR = 'Network Error'
export const HTTP_NETWORK_ISSUE_ERROR =
  'This could be server network issue or dropped internet connection'

const ERROR_MESSAGE = {
  HTTP_ERROR,
  HTTP_UNAUTHORIZED_ACTION,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_LOGIN_ERROR,
  HTTP_UNKNOWN_ERROR,
  HTTP_UNPROCESSED_REQUEST,
  HTTP_NETWORK_ERROR,
  HTTP_NETWORK_ISSUE_ERROR,
  HTTP_SESSION_EXPIRED,
}

export default ERROR_MESSAGE
