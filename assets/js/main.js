// ---------------------------------------------------------------------------
// Mobile nav toggle. Everything else on the site is plain CSS/HTML on purpose
// so it stays easy to edit later.
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var tabs = document.querySelector('.tabs');

  if (toggle && tabs) {
    toggle.addEventListener('click', function () {
      var isOpen = tabs.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
});
