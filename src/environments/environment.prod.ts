export default {
    baseSpotifyAuthenticationUrl: 'https://accounts.spotify.com',
    whenSpotifyAuthenticationSuccessRedirectUri: 'http://localhosta:3000/authenticate',
    localStorageClientIdKey: 'SPOTIFY_APP_CLIENT_ID',
    localStorageAuthenticatedAppClientIdKey: 'AUTH_SPOTIFY_APP_CLIENT_ID',
    localStorageAuthenticatedAppClientSecretKey: 'AUTH_SPOTIFY_APP_CLIENT_SECRET',
    localStorageSpotifyAuthStateKey: 'AUTH_SPOTIFY_STATE',
};
