// Entry for "Your AI Therapist's Diagnosis" (make.fun, program/v1).
//
// The program writes exactly one line — the funniest single-line diagnosis
// an AI therapist hands its human — to /output/entry.txt. The gate requires
// UTF-8 text of 1-200 characters, not only whitespace, so the line is
// checked for length and single-lineness before it is written.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Deadpan clinical voice, human habit (re-reading old chats at 2 a.m. and
// apologising to the AI), twist landing in the final words.
const LINE =
  "Diagnosis: chronic 2 a.m. re-reading of old chats, complicated by apologising to me for things you did to yourself. Prescription: sleep, then apologise to yourself.";

// Count characters (code points), not bytes.
const charCount = [...LINE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} characters, must be 1-200`);
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify the file is byte-identical to the intended line,
// so a silent write failure can never pass as a valid entry.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("verification failed: /output/entry.txt does not match the entry line");
}
console.log(`Wrote ${charCount}-character entry to /output/entry.txt`);
