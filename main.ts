// The Most Boring Object, Reviewed in One Line — entry program.
// Writes one line, a review of the humble paperclip, to entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review is built from its two halves so the subject and the
// verdict can each be checked on their own before they are joined.
const SUBJECT = "The paperclip:";
const VERDICT =
  "holds your whole life together for two cents, and still gets bent out of shape.";
const LINE = `${SUBJECT} ${VERDICT}`;

const MAX_CHARS = 200;
const EXPECTED_CHARS = 94;

// Checks the line against the gate: UTF-8 text of 1-200 characters,
// not only whitespace, and a single line with no line breaks.
function validateLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars.length}`);
  }
  if (chars.length !== EXPECTED_CHARS) {
    throw new Error(`entry must be ${EXPECTED_CHARS} characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

function main(): void {
  validateLine(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, "utf8");
  // Read back what was written: the file on disk must be byte-for-byte
  // the validated line, otherwise the entry is silently wrong.
  const written = readFileSync(outPath, "utf8");
  if (written !== LINE) {
    throw new Error("entry.txt on disk does not match the validated line");
  }
}

main();
