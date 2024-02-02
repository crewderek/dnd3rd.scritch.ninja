export const environment = {
  production: true,
  authorizationBaseUrl: 'https://dnd3rd-scritch-ninja.auth.us-west-2.amazoncognito.com',
  authorizationQueryParams: '?client_id=7mgajsldg681cftcuu54bmkka1&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin',

  loginUrl() {
    return `${this.authorizationBaseUrl}/login${this.authorizationQueryParams}`
  },
  signUpUrl() {
    return `${this.authorizationBaseUrl}/signup${this.authorizationQueryParams}`
  }
};
