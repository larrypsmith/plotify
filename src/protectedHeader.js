const ProtectedHeader = {
  html: () => (`
    <h1>Plotify</h1>

    <ul>
      <li>Each white ring represents a genre.</li>
      <li>Click on a ring or bar to zoom in on a genre.</li>
      <li>When zoomed on a genre, hover over an artist's picture to see their name.</li>
    </ul>

    <div class="links">
      <a href="https://github.com/larrypsmith/plotify">
        <i class="fab fa-github fa-2x"></i>
      </a>
      <a href="https://www.linkedin.com/in/larrypaulsmith/">
        <i class="fab fa-linkedin fa-2x"></i>
      </a>
      <a href="https://angel.co/u/larry-paul-smith">
        <i class="fab fa-angellist fa-2x"></i>
      </a>
    </div>
  `),

  render: function() {
    const node = document.createElement('header')
    node.innerHTML = this.html();
    return node;
  }
};

export default ProtectedHeader;