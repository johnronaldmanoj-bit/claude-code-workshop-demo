# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a deliberately imperfect sandbox for the "Build your CLAUDE.md" workshop
exercise (see README.md). The quirks in the code are intentional teaching
material — do not "clean them up" unless the task explicitly asks for it.

## Commands

```bash
npm test                        # run all tests (node --test, no dependencies)
node --test tests/pricing.test.js   # run a single test file
node --test --test-name-pattern "empty cart"   # run a single test by name
```

There is no build step, no linter, and no dependency install — the project is
plain ESM (`"type": "module"`) run directly by Node's built-in test runner.
Every import must carry its `.js` extension.

## Architecture

Money flows in one direction: `orders` → `pricing` → `shared`.

- `src/pricing/calculateInvoice.js` is the single source of invoice math. It
  takes an array of line-item amounts **in cents** and returns
  `{ subtotalCents, taxCents, totalCents, display }`.
- `src/orders/createOrder.js` wraps an invoice with an in-memory,
  process-local incrementing `id`. Order ids are not stable across runs, so
  tests must not assert on specific id values.
- `src/shared/formatCurrency.js` is the only place amounts become strings.

All amounts are integer cents end to end; conversion to a decimal string
happens only inside `formatCurrency`. Keep new code in cents and format at the
boundary rather than introducing floats upstream.

## Repo conventions

- `formatCurrency` is shared by both `pricing` and `orders`. Changing its
  output format changes every caller — check both consumers and both test
  files before touching it.
- `TAX_RATE` in `calculateInvoice.js` comes from Finance's current-quarter
  filing. It is not a magic number to tidy away; do not change it without an
  explicit instruction, and note that `tests/pricing.test.js` hardcodes the
  same rate, so the two must move together.
- `createOrder` has a `console.log` in library code. It is a known wart from
  the exercise — leave it unless removing it is the task.

## Stop and ask before

- Editing `TAX_RATE` or any other value described in a comment as externally
  sourced.
- Changing the shape of `calculateInvoice`'s return object or
  `formatCurrency`'s output string — both are cross-module contracts.
- Adding dependencies or a build/lint toolchain; the zero-dependency,
  `node --test` setup is deliberate.
