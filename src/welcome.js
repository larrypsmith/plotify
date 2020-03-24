export default {
  renderWelcome: function() {
    const html = `
      <h2>
        Plotify plots your top Spotify artists in a Venn diagram that compares their genres.
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