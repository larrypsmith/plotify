import Router from './router';

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  const router = new Router(main);
  router.render();
})