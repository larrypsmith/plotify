import QueryString from 'query-string';

export const redirectToLogin = (state) => {
  window.location.href = 'https://accounts.spotify.com/authorize' +
  '?client_id=45966386e108497e8a2e05195e9b94cc' +
  '&response_type=token' + 
  '&redirect_uri=http://127.0.0.1:5500/index.html' +
  '&scope=user-top-read' +
  '&limit=50' +
  `&state=${state}`;
}

export const isAuthenticated = () => {
  const hash = window.location.hash.substr(1);
  return hash.includes('access_token');
}

export const getAccessToken = () => {
  const hash = window.location.hash.substr(1);
  const parsedHash = QueryString.parse(hash);
  return parsedHash.access_token;
}

export const fetchArtists = responseCallback => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.spotify.com/v1/me/top/artists?limit=50`);
  xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
  xhr.onload = responseCallback;
  xhr.send();
}