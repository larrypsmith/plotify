import Venn from './venn';
import Welcome from './welcome';

const isAuthenticated = () => {
  const hash = window.location.hash.substr(1);
  return hash.includes('access_token');
}

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  main.innerHTML = "";
  
  if (isAuthenticated()) {
    debugger
    const venn = new Venn();
    main.appendChild(venn.render);
  } else {
    debugger
    main.appendChild(Welcome.render())
  }
})