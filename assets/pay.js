/* Wires each pay button to its Stripe link.
   A link that is still null routes to the contact page instead of a dead end. */
(function () {
  var links = window.DF_PAYMENTS || {};
  var nodes = document.querySelectorAll('[data-pay]');
  Array.prototype.forEach.call(nodes, function (el) {
    var url = links[el.getAttribute('data-pay')];
    if (url) {
      el.setAttribute('href', url);
    } else {
      // A page can name its own fallback, e.g. Labs falls back to booking a call.
      el.setAttribute('href', el.getAttribute('data-fallback-href') || '/contact.html');
      el.textContent = el.getAttribute('data-fallback-text') || 'Contact us to set this up';
    }
  });
  // The setup notice is only for the un-configured state.
  var anyLive = Object.keys(links).some(function (k) { return !!links[k]; });
  var n = document.getElementById('setup-notice');
  if (n && anyLive) n.hidden = true;
})();
