/* Deep Field — client onboarding form endpoint.

   Same rule as the contact form: while this is null the page shows a plain
   email fallback instead of a form, so nothing is ever submitted into a void.

   Use a FormSubmit alias, not the bare studio address — the bare address in
   page source is a spam magnet, and the alias can be rotated without touching
   the markup. Get one by submitting to formsubmit.co/deepfieldstudios@gmail.com
   once, confirming by email, then using the alias URL it returns.

   Note this form carries client contact details, so it must only ever POST to
   an endpoint that delivers to deepfieldstudios@gmail.com. */
/* Bare address for now. FormSubmit sends a one-time confirmation to the studio
   inbox on the FIRST submission — click it and the form goes live. Then swap this
   for the alias URL FormSubmit returns, which is what Blue Element's arrival form
   ended up doing, and which keeps the address out of page source. */
window.DF_ONBOARDING = { form_endpoint: "https://formsubmit.co/deepfieldstudios@gmail.com" };
