export default {
  html: () => (`
    <h2>
      Plotify visualizes your favorite Spotify artists and genres.
    </h2>

    <button class="login-button">
      Connect with Spotify
    </button>
  `),

  render: function() {
    let container = document.createElement('div');
    container.className = 'hero';
    container.innerHTML = this.html();
    return container;
  }
}