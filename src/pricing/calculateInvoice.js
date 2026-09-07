import { formatCurrency } from '../shared/formatCurrency.js';

// Set from Finance's current-quarter filing. Do not edit ad hoc.
const TAX_RATE = 0.0825;

export function calculateInvoice(lineItemsCents) {
  const subtotalCents = lineItemsCents.reduce((sum, cents) => sum + cents, 0);
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  return {
    subtotalCents,
    taxCents,
    totalCents,
    display: formatCurrency(totalCents),
  };
}
