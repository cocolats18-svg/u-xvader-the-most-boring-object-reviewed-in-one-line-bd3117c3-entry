// The Most Boring Object, Reviewed in One Line — entry program.
// Writes one line, a review of the humble paperclip, to entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The paperclip: holds your whole life together for two cents, and still gets bent out of shape.";

const MAX_CHARS = 200;

// Checks the line against the gate: UTF-8 text of 1-200 characters,
// not only whitespace, and a single line with no line breaks.
function validateLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateLine(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
}

main();
