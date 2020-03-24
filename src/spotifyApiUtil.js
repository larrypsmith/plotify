// export const redirectToLogin = () => {
//   const xhr = new XMLHttpRequest();
//   xhr.open('GET',
//     `https://accounts.spotify.com/authorize` +
//     `?client_id=45966386e108497e8a2e05195e9b94cc` +
//     `&response_type=token` +
//     `&redirect_uri=https://larrypsmith.github.io/plotify/` +
//     `&scope=user-top-read`,
//     false
//   )
//   xhr.send()
// }

export const redirectToLogin = () => {
  window.location.replace('https://accounts.spotify.com/authorize?client_id=45966386e108497e8a2e05195e9b94cc&response_type=token&redirect_uri=https://larrypsmith.github.io/plotify/&scope=user-top-read')
}