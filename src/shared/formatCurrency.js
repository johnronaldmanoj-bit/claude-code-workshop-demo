// Used by both src/pricing/ and src/orders/ — a change here affects every
// caller's output format, not just the one you're currently working on.
export function formatCurrency(amountCents, currency = 'USD') {
  const amount = (amountCents / 100).toFixed(2);
  return `${currency} ${amount}`;
}
