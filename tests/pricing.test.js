import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateInvoice } from '../src/pricing/calculateInvoice.js';

test('calculateInvoice applies tax to the subtotal', () => {
  const invoice = calculateInvoice([1000, 2000]);
  assert.equal(invoice.subtotalCents, 3000);
  assert.equal(invoice.taxCents, Math.round(3000 * 0.0825));
  assert.equal(invoice.totalCents, invoice.subtotalCents + invoice.taxCents);
});

test('calculateInvoice handles an empty cart', () => {
  const invoice = calculateInvoice([]);
  assert.equal(invoice.totalCents, 0);
});
