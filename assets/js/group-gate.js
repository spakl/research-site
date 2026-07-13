// ---------------------------------------------------------------------------
// THIS IS NOT REAL AUTHENTICATION.
//
// GitHub Pages only serves static files — there is no server here to check a
// username/password against. This script just lets the form "submit" so you
// can see the intended flow. Anyone can view-source and skip straight to
// dashboard.html, and anything you put in this repo ships to every visitor's
// browser whether they "log in" or not.
//
// Before putting real content behind this page, see the README section
// "Securing the group area" for options (GitHub org access, Google Drive
// sharing, Cloudflare Access, etc). Then replace this file.
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('gate-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Demo behavior only: any non-empty username/password "succeeds".
    window.location.href = 'dashboard.html';
  });
});
