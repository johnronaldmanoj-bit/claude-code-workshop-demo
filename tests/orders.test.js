import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createOrder } from '../src/orders/createOrder.js';

test('createOrder returns an order with an id and customer name', () => {
  const order = createOrder('Acme Co', [500]);
  assert.ok(order.id);
  assert.equal(order.customerName, 'Acme Co');
});
