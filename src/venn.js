export default {
  vennHtml: function() {
    const html = 'This is the venn element';
    return html;
  },

  render: function() {
    let container = document.createElement("div");
    container.className = "venn";
    container.innerHTML = this.vennHtml();
    return container;
  }
}