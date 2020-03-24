const generateRandomString = () => (
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
)

export const redirectToLogin = () => {
  window.location.href = `https://accounts.spotify.com/authorize?client_id=45966386e108497e8a2e05195e9b94cc&response_type=token&redirect_uri=https://larrypsmith.github.io/plotify/&scope=user-top-read&state=${generateRandomString()}`
}

export const requestTopArtists = (accessToken) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.spotify.com/v1/me/top/artists`);
  xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  xhr.send();
  xhr.onload(() => {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  });

}