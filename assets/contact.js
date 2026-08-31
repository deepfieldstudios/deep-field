(function () {
  var cfg = window.DF_CONTACT || {};
  var form = document.getElementById('contact-form');
  if (!form) return;
  if (!cfg.form_endpoint) { form.hidden = true; return; }
  document.getElementById('email-fallback').hidden = true;
  form.hidden = false;
  form.setAttribute('action', cfg.form_endpoint);
})();
