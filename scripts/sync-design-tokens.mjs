#!/usr/bin/env node
// Copies the design system's build/tokens.css into app/assets/css/design-tokens.generated.css
// (byte-identical; the "generated - do not edit" marker is the source's own first line).
//
//   node scripts/sync-design-tokens.mjs           write the copy
//   node scripts/sync-design-tokens.mjs --check   compare the copy with the source
//
// Source folder: env DESIGN_SYSTEM_DIR (the design-system/<project> folder), default
// ../design-system/machinemaster relative to the repo root.
// --check exits 1 when the copy differs from a reachable source; when the source is not
// reachable (e.g. Cloud Build, which sees this repo alone) it prints one line and exits 0.
import { copyFileSync, existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const designSystemDir = resolve(
  repoRoot,
  process.env.DESIGN_SYSTEM_DIR || '../design-system/machinemaster',
)
const source = resolve(designSystemDir, 'build/tokens.css')
const copy = resolve(repoRoot, 'app/assets/css/design-tokens.generated.css')
const check = process.argv.includes('--check')

if (!existsSync(source)) {
  if (check) {
    console.log('design-system source not reachable - copy not verified')
    process.exit(0)
  }
  console.error(`design-system source not found: ${source} (set DESIGN_SYSTEM_DIR)`)
  process.exit(1)
}

if (check) {
  if (!existsSync(copy)) {
    console.error('design tokens copy is missing - run: npm run tokens:sync')
    process.exit(1)
  }
  if (!readFileSync(source).equals(readFileSync(copy))) {
    console.error('design tokens copy differs from the source - run: npm run tokens:sync')
    process.exit(1)
  }
  console.log('design tokens copy matches the source')
} else {
  copyFileSync(source, copy)
  console.log(`design tokens copied: ${source} -> ${copy}`)
}
