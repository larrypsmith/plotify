import * as d3 from 'd3';

export default function() {

  getGenres = function() {
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
}