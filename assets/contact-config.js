/* Deep Field — contact form endpoint.
   Static hosting has no mail server, so the form needs a third-party endpoint
   (Formspree, Basin, Cloudflare Pages Function — any that accepts a POST).

   While this is null the page shows the email address instead of a form, so
   nothing is ever submitted into a void. Paste an endpoint URL to enable it. */
window.DF_CONTACT = { form_endpoint: null };
