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
  care_essential: null,   // $45 / month  — hosting, SSL, backups, monitoring
  care_active:    null,   // $95 / month  — Essential + 1 hr content changes
  care_partner:   null,   // $180 / month — Active + 48h priority + quarterly call

  // --- One-off settlement: "customer chooses price" link ----------------
  // Stripe: price type "Customer chooses price", min $1, collect name + email,
  // and enable the payer note field labelled "Invoice number".
  // Same link as config.json → payment.stripe_fallback_link. Keep them equal.
  invoice_any_amount: null,

  // --- Stripe-hosted customer portal ------------------------------------
  // Stripe: Settings → Billing → Customer portal → save, then copy the login link.
  // Lets clients change card details and cancel without emailing you.
  customer_portal: null
};
