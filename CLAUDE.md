# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

This is a deliberately imperfect sandbox for the "Build your CLAUDE.md" workshop
exercise (see README.md). The quirks in the code are intentional teaching
material — do not "clean them up" unless the task explicitly asks for it.

## Definition of done

A change is done when `npm test` passes with no failing specs. There is no
lint step, no build step, and no dependency install to satisfy — the zero-
dependency `node --test` run is the entire bar.

## How to work

- Before editing a shared module (`@src/shared/formatCurrency.js` or
  `@src/pricing/calculateInvoice.js`), grep for its callers and their test
  files first, and say which ones you checked.
- Run `npm test` before and after a change and report the actual pass/fail
  counts — not just "tests pass."
- One file at a time for cross-module edits (e.g. a `formatCurrency` change
  plus its two call sites): show the diff for each before moving to the next.

## Commands

```bash
npm test                        # run all tests (node --test, no dependencies)
node --test tests/pricing.test.js   # run a single test file
node --test --test-name-pattern "empty cart"   # run a single test by name
```

The project is plain ESM (`"type": "module"`) run directly by Node's built-in
test runner. Every import must carry its `.js` extension.

## Architecture

Money flows in one direction: `orders` → `pricing` → `shared`.

- @src/pricing/calculateInvoice.js is the single source of invoice math. It
  takes an array of line-item amounts **in cents** and returns
  `{ subtotalCents, taxCents, totalCents, display }`.
- @src/orders/createOrder.js wraps an invoice with an in-memory,
  process-local incrementing `id`. Order ids are not stable across runs, so
  tests must not assert on specific id values.
- @src/shared/formatCurrency.js is the only place amounts become strings.

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
