export default class Venn {
  constructor(artists) {
    this.artists = artists;
  }

  vennHtml() {
    const html = this.artists.map(artist => artist.name);
    return html;
  }

  render() {
    let container = document.createElement("div");
    container.className = "venn";
    container.innerHTML = this.vennHtml();
    return container;
  }
}