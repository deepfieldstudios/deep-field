/* ============================================================================
   Deep Field — Stripe payment links.  THE ONLY FILE YOU EDIT TO GO LIVE.
   ----------------------------------------------------------------------------
   Every link below is a Stripe Payment Link. Create them per the SOP at
   04_Operations/SOPs/stripe-invoicing-setup.md, then paste each URL in place of
   the null. Prices must match 04_Operations/Pricing-Packages/rate-card.md.

   Any link left as null renders its button disabled on /pay.html — so a
   half-configured page never shows a button that leads nowhere.
   ========================================================================== */
window.DF_PAYMENTS = {

  // --- Care plans: RECURRING payment links, monthly, USD ----------------
  // Stripe: Payment links → + New → price type Recurring → Monthly.
  // Do NOT limit the use count on these — each is reused by every client.
  care_essential: "https://buy.stripe.com/3cIaEYceE4jfd9HgtSg7e00",   // $45 / month  — hosting, SSL, backups, monitoring
  care_active:    "https://buy.stripe.com/9B6aEY5QgdTP0mV7Xmg7e01",   // $95 / month  — Essential + 1 hr content changes
  care_partner:   "https://buy.stripe.com/6oUaEYfqQ9Dzb1z5Peg7e02",   // $180 / month — Active + 48h priority + quarterly call

  // --- One-off settlement: "customer chooses price" link ----------------
  // Stripe: price type "Customer chooses price", min $1, collect name + email,
  // and enable the payer note field labelled "Invoice number".
  // Same link as config.json → payment.stripe_fallback_link. Keep them equal.
  invoice_any_amount: "https://buy.stripe.com/9B600k0vWcPL9XvgtSg7e03",

  // --- Labs setup packages: ONE-OFF payment links, USD ------------------
  // Created by 00_Admin/Stripe/provision-labs.py. Each redirects to /labs-start.html.
  // While null, the Labs page shows "Book a call" in place of "Buy now".
  labs_files:   "https://buy.stripe.com/fZu8wQ6UkcPL3z7dhGg7e04", // $1,200 — AI for your files (small business)
  labs_starter: null,   // $2,500 — Agent guardrails: Starter

  // --- Stripe-hosted customer portal ------------------------------------
  // Stripe: Settings → Billing → Customer portal → save, then copy the login link.
  // Lets clients change card details and cancel without emailing you.
  customer_portal: "https://billing.stripe.com/p/login/3cIaEYceE4jfd9HgtSg7e00"
};
