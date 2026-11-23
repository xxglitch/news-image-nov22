// The World — Sunday, November 22, 2026
// Entry for the make.fun news-image-20261122 competition.
//
// This program writes the day's front-page image to the output directory.
// It copies the bundled entry.png — a broadsheet front page summarising the
// world news of Sunday 22 November 2026 — to $MAKEFUN_OUTPUT_DIR/entry.png.
//
// The image is the whole entry: six verified stories (COP31 collapses in
// Antalya; Mexico captures 'El Chapo Isidro'; a Russian drone strike on
// Dymer near Kyiv; BepiColombo reaches Mercury; a factory fire in
// Indonesia; Gulf shipping hit), under the date line
// "Sunday, November 22, 2026".
//
// No network, no dependencies, standard library only. The program is
// deterministic: every run writes the same bytes.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the bundled image relative to this file, never relative to the
// current working directory: the grader runs from a different cwd.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// Guard: fail loudly instead of writing a partial or missing image.
const info = statSync(source);
if (!info.isFile() || info.size === 0) {
  throw new Error(`bundled image missing or empty: ${source}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "entry.png"));
