const apiPath = '/api/v1'

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'signup'].join('/'),
  channelsPath: () => [apiPath, 'channels'].join('/'),
  messagesPath: () => [apiPath, 'messages'].join('/'),
  chatPage: '/',
  mainPage: '/login',
  signupPage: '/signup',
  notFound: '/*',
}
