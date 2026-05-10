#!/usr/bin/env node
// Copy every file whose name contains "?" to a clean name without the query string.
// Skips if the clean target already exists with identical size.
import { readdirSync, statSync, copyFileSync, existsSync } from "fs";
import { join, dirname, basename } from "path";
import { fileURLToPath } from "url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "funderpro.com");
let copied = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (name.includes("?")) {
      const cleanName = name.split("?")[0];
      const cleanPath = join(dir, cleanName);
      if (!existsSync(cleanPath)) {
        copyFileSync(full, cleanPath);
        console.log("Copied:", full.replace(ROOT, "").split("?")[0]);
        copied++;
      }
    }
  }
}

console.log("Fixing query-string filenames under", ROOT);
walk(ROOT);
console.log(`\nDone — copied ${copied} file(s).`);
