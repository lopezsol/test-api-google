export const environment = {
  googleClientId: (window as any)['NG_APP_GOOGLE_CLIENT_ID'] || '',
  googleApiKey: (window as any)['NG_APP_GOOGLE_API_KEY'] || '',
  mobyUrl: (window as any)['NG_APP_MOBY_URL'] || '',
  redirectUriLogin: (window as any)['NG_APP_REDIRECT_URI_LOGIN'] || '',
  production: true,
};
