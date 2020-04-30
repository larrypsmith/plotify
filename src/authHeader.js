const AuthHeader = {
  html: () => (`<h1>Plotify</h1>`),

  render: function () {
    const node = document.createElement('header')
    node.innerHTML = this.html();
    return node;
  }
};

export default AuthHeader;