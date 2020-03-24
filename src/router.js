import Venn from './venn';
import Welcome from './welcome';

export default class Router {
  constructor(node) {
    this.node = node;
  }

  isAuthenticated() {
    const hash = window.location.hash.substr(1);
    return hash.includes('access_token');
  }

  render() {
    this.node.innerHTML = ""; 
    if (this.isAuthenticated()) {
      this.node.appendChild(Venn.render())
    } else {
      this.node.appendChild(Welcome.render())
    };
  }
}