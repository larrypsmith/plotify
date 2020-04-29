import { descending } from 'd3';
import QueryString from 'query-string';

export const redirectToLogin = () => {
  window.location.href = 'https://accounts.spotify.com/authorize' +
  '?client_id=45966386e108497e8a2e05195e9b94cc' +
  '&response_type=token' + 
  '&redirect_uri=http://127.0.0.1:5500/index.html' +
  '&scope=user-top-read' +
  '&limit=50'
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

export const fetchArtists = callback => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.spotify.com/v1/me/top/artists?limit=50`);
  xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
  xhr.onload = () => callback(xhr.response);
  xhr.send();
}

export const formatResponse = response => {
  response = JSON.parse(response);
  const genres = {}
  
  response.items.forEach(artist => {
    artist.genres.forEach(genre => {
      if (!genres[genre]) genres[genre] = [];
      genres[genre].push({
        name: artist.name,
        imageUrl: artist.images[1].url
      })
    })
  });

  return Object.keys(genres)
    .map(name => ({ name, children: genres[name] }))
    .filter(genre => genres[genre.name].length > 1)
    .sort((a, b) => descending(a.children.length, b.children.length))
}