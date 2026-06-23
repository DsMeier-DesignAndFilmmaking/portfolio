// One-off: dump the property schema of each OS database so lib/notion-os.ts
// can reference exact property names. Run:
//   node --env-file=.env.local scripts/introspect-notion-os.mjs
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY, notionVersion: '2022-06-28' });

const DATABASES = {
  Organizations: '3d58ea50-5593-4fac-a3f6-2b1cb0d882eb',
  'System Artifacts': 'f4ebb36a-5d2f-4586-a511-370156d1d9b8',
  'Experience Patterns': 'a17d85b2-7afd-41ff-8902-6256fe94f385',
  'Projects & Concepts': '15850fbe-b755-4cf7-9f58-2a4dd38b9e44',
  'Portfolio Assets': 'b1fc6b8d-6080-4a83-8c43-fffc923de4db',
};

for (const [label, id] of Object.entries(DATABASES)) {
  try {
    const db = await notion.databases.retrieve({ database_id: id });
    console.log(`\n=== ${label} (${id}) ===`);
    for (const [name, prop] of Object.entries(db.properties)) {
      let extra = '';
      if (prop.type === 'select' && prop.select?.options) {
        extra = ' -> ' + prop.select.options.map((o) => o.name).join(' | ');
      } else if (prop.type === 'multi_select' && prop.multi_select?.options) {
        extra = ' -> ' + prop.multi_select.options.map((o) => o.name).join(' | ');
      } else if (prop.type === 'status' && prop.status?.options) {
        extra = ' -> ' + prop.status.options.map((o) => o.name).join(' | ');
      }
      console.log(`  "${name}" : ${prop.type}${extra}`);
    }
  } catch (err) {
    console.error(`FAILED ${label}:`, err.body || err.message);
  }
}
