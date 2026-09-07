import { calculateInvoice } from '../pricing/calculateInvoice.js';
import { formatCurrency } from '../shared/formatCurrency.js';

let nextOrderId = 1000;

export function createOrder(customerName, lineItemsCents) {
  const invoice = calculateInvoice(lineItemsCents);
  const order = {
    id: nextOrderId++,
    customerName,
    ...invoice,
  };

  console.log(`Order ${order.id} created for ${customerName}: ${formatCurrency(order.totalCents)}`);

  return order;
}
