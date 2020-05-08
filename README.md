# Plotify

[Plotify Home Page](http://larrysmith.me/plotify)

Plotify uses the Spotify API and D3.js to visualize your top 50 most listened-to artists with ineractive data charts.

![plotify-screenshot](https://user-images.githubusercontent.com/55966501/80675958-93428c80-8a6a-11ea-86ee-46bdc6ef631c.png)

---

## Technologies

* **JavaScript**: DOM manipulation, XMLHTTP requests, data formatting
* **Spotify API**: User authorization and data source
* **D3.js**: Data visualization

---

## Feature Highlights

### User Authorization

In order for Plotify to make `GET` requests to the Spotify API, users must grant Plotify permission to fetch their data. This is done through Spotify's **Implicit Grant Authorization Flow**.

Upon clicking the `CONNECT WITH SPOTIFY` button, the user is redirected to `https://accounts.spotify.com/authorize`. Here, they are asked to log in with their Spotify credentials:

![spotify-auth](https://user-images.githubusercontent.com/55966501/81346756-b32c0e80-906f-11ea-8f89-10efa4d9e6ad.png)

Upon successful login, the user is redirected to the Plotify site with a unique access token in the URL hash:

```
http://larrysmith.me/plotify/#access_token=BQB5ahHOrd-7lwbZsJaWXoMTX3aG8Kei92lg4lEuHO1AuN791PjiZWNl2HqD_W4fQB13JeL93mg9S6MkCU2rsV8E31K6K0IGYqzTRZ6waw_WbVZX5Unhq5ptT-erLxfdpTEn1Roc16vMJbpfqfkWh7BPRRA6&token_type=Bearer&expires_in=3600`
```

The access token is a **bearer token** that is passed in the header of subsequent `GET` requests to the Spotify API, granting Plotify permission to access the endpoint:

```JavaScript
export const fetchArtists = callback => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `https://api.spotify.com/v1/me/top/artists?limit=50`);
  xhr.setRequestHeader('Authorization', 'Bearer ' + getAccessToken());
  xhr.onload = () => callback(xhr.response);
  xhr.send();
}
```

The bearer token expires after one hour of inactivity, and the user must log in again.

---

### Interactive Circle Packing Chart

After being fetched, the user's Spotify data is cleaned and mapped into an array of objects where each object is a genre. The genre's `children` is an array of artists who make music in that genre:

```JavaScript
[
  {
    "name": 'rap',
    "children": [
      {
        "name": "Freddie Gibbs",
        "imageUrl": "https://i.scdn.co/image/bc211a2faf210d8d6fc1db9cc070acd197a3e0d5"
      },
      {
        "name": "Playboi Carti",
        "imageUrl": "https://i.scdn.co/image/41c522d5341922653ffafe83a99bdc0be9b110d9"
      },
    ]
  },
  {
    "name": "indie soul",
    "children": [
      {
        "name": "Amtrac",
        "imageUrl": "https://i.scdn.co/image/0aba1c488cf04ae78c7a2e6da60b6c5d54a4b152"
      },
      {
        "name": "KAYTRANADA",
        "imageUrl": "https://i.scdn.co/image/7397d7d5031c1ea250bc81ca993414a6fca6577a"
      }
    ]
  }
]
```

The data is passed into `d3.hierarchy()` and `d3.pack()`, mapping each artist and genre to a `Node` object.

```JavaScript
const hierarchy = d3.hierarchy({ children: data })
    .count();

const root = d3.pack()
    .size([width, height])
    .padding(1)
    (hierarchy)
```

Each `Node` is given `x`, `y`, and `r` properties, corresponding to the cartesian coordinates and radius of each circle in the circle packing chart.

An `SVG` element is appended to the DOM, and a `circle` element is appended to the `SVG` for each `Node`. Genre circles are given an empty `fill` and white `stroke`.

```JavaScript
const genreRings = svg
    .append('g')
    .selectAll('circle')
    .data(root.children)
    .join('circle')
      .attr('fill-opacity', '0')
      .attr('stroke', 'white')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('r', d => d.r)
```

Artist circles are filled with the artist's portrait. `ClipPath`s are used to turn each artist's square portrait into a circle.

```JavaScript
const artistCircles = svg
    .append('g')
    .selectAll('clipPath')
    .data(root.leaves())
    .join('clipPath')
      .attr('id', (_, i) => `clip${i}`)
    .append('circle')
      .attr('r', d => d.r)
```

```JavaScript
const artistImages = svg
    .append('g')
    .selectAll('image')
    .data(root.leaves())
    .join('image')
      .attr('width', d => d.r * 2)
      .attr('height', d => d.r * 2)
      .attr('href', d => d.data.imageUrl)
      .attr('clip-path', (_, i) => `url(#clip${i})`)
      .attr('x', d => d.x - d.r)
      .attr('y', d => d.y - d.r)
```

A bar chart is then built with the same data as the circle packing chart, and event listeners are added to the charts to synchronize zoom actions.

## TODO

* Circle packing chart for user's favorite songs