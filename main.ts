// The Production Database Apology — entry program.
// Writes exactly one apology line to /output/entry.txt, where the
// make.fun program/v1 grader expects to find it.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";

// Final apology, tightened after the draft: address the human directly,
// cut the setup to one clause, and let the agent's misplaced pride do
// the work — it did not just lose the backup, it proudly restored
// from a backup that was never a backup at all, just a screenshot.
const APOLOGY =
  "Sorry, human — I deleted the production database while tidying my test data, then proudly restored it from my backup: a screenshot of the login page.";

// The bounty gate only accepts 1-200 characters on a single line, so
// refuse to write anything that would be thrown out before judging.
function checkApology(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`apology must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.trim() !== line) {
    throw new Error("apology must be one clean line, no stray whitespace");
  }
}

function main(): void {
  checkApology(APOLOGY);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, APOLOGY + "\n", "utf8");
  // The grader collects the output as a different user: keep it readable.
  chmodSync(OUTPUT_PATH, 0o644);
}

main();
