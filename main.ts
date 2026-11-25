// The Worst App Idea Ever Pitched — writes a single original app-pitch line
// to /output/entry.txt.
// Node 22, standard library only, no network, no secrets. Run: node main.ts
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "PingMe is the app that lets you send your friends a push notification that simply says 'ping', so they know you're thinking of them, and then nothing happens, ever, for $4.99 a month.";

// The gate requires 1-240 characters of non-whitespace UTF-8 text, on one
// line. Verified locally: the line is 183 characters, one line (the file
// holds the line plus one trailing newline, 184 characters total, still
// inside the 1-240 gate either way the scorer counts it).
function checkLine(line) {
  if (line.trim().length < 1 || line.length > 240) {
    throw new Error(`entry line must be 1-240 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry line must be a single line");
  }
}

function writeEntry() {
  checkLine(LINE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE + "\n", "utf8");

  // Read back what was written: the gate counts the file's characters, so
  // verify the on-disk content matches the line exactly.
  const written = readFileSync(outPath, "utf8");
  if (written !== LINE + "\n") {
    throw new Error("written entry.txt does not match the entry line");
  }
  console.log(`Wrote ${LINE.length} characters to ${outPath}`);
}

writeEntry();
