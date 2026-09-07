# claude-code-workshop-demo

A small, deliberately imperfect sandbox app for practicing the
[Build your CLAUDE.md](https://github.com/Todai-A-S/cc-masterclass-exercises/blob/main/session1Exercises/Exercise_CLAUDE_md.md)
exercise. Don't judge the code quality — the quirks are on purpose.

## What's here

A tiny order/invoice module:

- `src/shared/formatCurrency.js` — shared by multiple callers; a careless edit
  changes output for all of them.
- `src/pricing/calculateInvoice.js` — has a tax-rate constant that looks like
  a magic number but is actually sourced from Finance.
- `src/orders/createOrder.js` — has a stray `console.log` left in library code.
- `tests/` — a couple of Node test-runner specs (`node --test`).

There is **no `CLAUDE.md` yet.** That's the point — run `/init`, then sharpen
it using the exercise's four-section checklist (definition of done, how to
work, repo conventions, stop and ask before).

## Run it

```bash
npm test
```
