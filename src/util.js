export const redirectToLogin = (state) => {
  window.location.href = 'https://accounts.spotify.com/authorize' +
  '?client_id=45966386e108497e8a2e05195e9b94cc' +
  '&response_type=token' + 
  '&redirect_uri=https://larrypsmith.github.io/plotify/' +
  '&scope=user-top-read' +
  `&state=${state}`
}

export const requestTopArtists = (accessToken) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.spotify.com/v1/me/top/artists`, false);
  xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  xhr.send();
  const response = JSON.parse(xhr.response);
  return response.items.map(artist => ({
    name: artist.name,
    genres: artist.genres
  }));
}