export default {
  renderWelcome: function() {
    const html = `
      <h2>
        Plotify creates a circle packing chart of your favorite Spotify artists and genres.
      </h2>

      <button id="login">
        Connect with Spotify
      </button>
    `
    return html;
  },

  render: function() {
    let container = document.createElement('div');
    container.className = 'welcome';
    container.innerHTML = this.renderWelcome();
    return container;
  }
}