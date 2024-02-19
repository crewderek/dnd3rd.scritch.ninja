import {CommonEnvironment} from "./environment.common";

export const environment = {
  ...CommonEnvironment,
  production: true,
  apiEnv: '/api',
  authorizationQueryParams: `?client_id=${CommonEnvironment.clientId}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fdnd3rd.scritch.ninja%2Flogin`,
  logoutQueryParams: `?client_id=${CommonEnvironment.clientId}&logout_uri=https%3A%2F%2Fdnd3rd.scritch.ninja%2Flogout`,

  apiEnvUrl(){
    return `${CommonEnvironment.apiBaseURL}${this.apiEnv}`;
  },
  loginUrl() {
    return `${this.authorizationBaseUrl}/login${this.authorizationQueryParams}`
  },
  logoutUrl() {
    return `${this.authorizationBaseUrl}/logout${this.logoutQueryParams}`;
  },
  signUpUrl() {
    return `${this.authorizationBaseUrl}/signup${this.authorizationQueryParams}`
  }
};
