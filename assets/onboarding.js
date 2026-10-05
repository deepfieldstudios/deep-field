(function () {
  var cfg = window.DF_ONBOARDING || {};
  var form = document.getElementById('onboarding-form');
  if (!form) return;
  if (!cfg.form_endpoint) { form.hidden = true; return; }
  var fb = document.getElementById('email-fallback');
  if (fb) fb.hidden = true;
  form.hidden = false;
  form.setAttribute('action', cfg.form_endpoint);

  // One request per person: a second requester is optional, so it stays folded
  // away until asked for. A form that opens with eight empty boxes gets abandoned.
  var add = document.getElementById('add-second');
  var second = document.getElementById('second-person');
  if (add && second) {
    add.addEventListener('click', function () {
      second.hidden = false;
      add.hidden = true;
      var f = second.querySelector('input');
      if (f) f.focus();
    });
  }
})();
