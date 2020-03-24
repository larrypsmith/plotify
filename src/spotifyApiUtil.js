const generateRandomString = () => (
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
)

export const redirectToLogin = () => {
  window.location.href = `https://accounts.spotify.com/authorize?client_id=45966386e108497e8a2e05195e9b94cc&response_type=token&redirect_uri=https://larrypsmith.github.io/plotify/&scope=user-top-read&state=${generateRandomString()}`
}