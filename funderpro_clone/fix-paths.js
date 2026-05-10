#!/usr/bin/env node
// Fix all absolute https://funderpro.com/ URLs in scraped HTML and CSS files
// to root-relative paths so the site works when served locally.
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

const ROOT = new URL(".", import.meta.url).pathname + "funderpro.com";
let fixed = 0;

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else {
      const ext = extname(name).toLowerCase();
      if ([".html", ".css", ".js"].includes(ext)) {
        let src = readFileSync(full, "utf8");
        const before = src;
        // Replace absolute funderpro.com URLs with root-relative
        src = src.replace(/https?:\/\/funderpro\.com\//g, "/");
        // Also handle protocol-relative //funderpro.com/
        src = src.replace(/\/\/funderpro\.com\//g, "/");
        if (src !== before) {
          writeFileSync(full, src, "utf8");
          fixed++;
          console.log("Fixed:", full.replace(ROOT, ""));
        }
      }
    }
  }
}

console.log("Fixing paths in", ROOT);
walk(ROOT);
console.log(`\nDone — fixed ${fixed} file(s).`);
