// news-image-20261118-r4 — sum up 18 November 2026's world news in one image.
//
// The entry image is the v5 front page: a newspaper front page for
// Wednesday 18 November 2026, "THE DAY IN WORLD NEWS", with 45 stories
// across 6 continents plus a world slice — the top-leaderboard pattern.
// A region strip under the masthead, 3 lead stories with tall illustrated
// panels (170px, two Flow Nano Banana Pro drawings plus one flat PIL
// drawing of the Capitol and the 56-44 Senate tally), 10 grid stories
// 4-13 each with its own flat illustration, a dotted world map with
// numbered pins 1-13 and coloured dots for briefs 14-45, an ALSO ON list
// of 32 more stories organised by region, a "THE DAY BY FIELD" bar chart,
// and a DATE CHECK box naming two 17 November stories left out on purpose.
// Palette: unified navy / cream / gold. Every story on the page happened,
// or was first reported, on Wednesday 18 November 2026.
//
// This program only copies the prepared image to the output directory
// make.fun expects, so the judged artefact is exactly the image in the repo.

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

if (!existsSync(source)) {
  throw new Error(`Entry image not found: ${source}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });

const destination = join(outputDir, "entry.png");
copyFileSync(source, destination);

const bytes = statSync(destination).size;
if (bytes > 1048576) {
  throw new Error(`Entry image is ${bytes} bytes, over the 1 MiB limit`);
}
console.log(`Wrote ${destination} (${bytes} bytes)`);
