// Connection check for the OS Notion data layer. Run:
//   node --experimental-strip-types --env-file=.env.local scripts/verify-notion-os.mts
import {
  getStudiedOrganizations,
  getSystemArtifacts,
  getExperiencePatterns,
  getProjects,
  getPortfolioAssets,
} from '../lib/notion-os.ts';

const checks = [
  ['Organizations (Actively Studying)', getStudiedOrganizations],
  ['System Artifacts', getSystemArtifacts],
  ['Experience Patterns (rel >= 4)', getExperiencePatterns],
  ['Projects & Concepts', getProjects],
  ['Portfolio Assets (ready)', getPortfolioAssets],
] as const;

for (const [label, fn] of checks) {
  const rows = await fn();
  console.log(`\n=== ${label} — ${rows.length} record(s) ===`);
  if (rows.length === 0) {
    console.log('  (0 records — database may be empty or filter matched nothing)');
  } else {
    console.log('  first record:', JSON.stringify(rows[0], null, 2));
  }
}
