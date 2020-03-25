export default class BubbleChart {
  constructor(artists) {
    this.artists = artists;
    this.genres = this.getGenres();
    debugger
  }

  getGenres() {
    let genres = {};

    this.artists.forEach(artist => {
      artist.genres.forEach(genre => {
        if (!genres[genre]) genres[genre] = [];
        genres[genre].push(artist.name);
      })
    });

    return Object.keys(genres).map(genre => ({
      name: genre,
      members: genres[genre]
    }));
  }

  vennHtml() {
    debugger
    const html = Object.keys(this.genres);
    return html;
  }

  render() {
    let container = document.createElement("div");
    container.className = "venn";
    container.innerHTML = this.vennHtml();
    return container;
  }
}