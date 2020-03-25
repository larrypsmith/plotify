import QueryString from 'query-string';

export default class Venn {
  constructor() {
    debugger
    this.accessToken = this.getAccessToken();
    this.fetchArtists();
  }

  getAccessToken() {
    const hash = window.location.hash.substr(1);
    const parsedHash = QueryString.parse(hash);
    return parsedHash.access_token;
  }

  fetchArtists() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.spotify.com/v1/me/top/artists`);
    xhr.setRequestHeader('Authorization', 'Bearer ' + this.accessToken);
    xhr.onload = function() {
      debugger
      const response = JSON.parse(xhr.response);
      this.artists = response.items.map(artist => ({
        name: artist.name,
        genres: artist.genres
      }));
    }
    xhr.send();
  }

  vennHtml() {
    debugger
    const html = this.artists;
    return html;
  }

  render() {
    debugger
    let container = document.createElement("div");
    container.className = "venn";
    container.innerHTML = this.vennHtml();
    return container;
  }
}