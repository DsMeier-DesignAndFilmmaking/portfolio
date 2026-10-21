# The Landscape Before the Snow — Artifact Manifest

This is the source of truth for external artifacts embedded in the case study.

## Current native artifacts
| ID | Title | Source | Status | Evidence boundary |
|---|---|---|---|---|
| LBS-01 | Annotated site sketch scaffold | Inline SVG / portfolio code | Schematic placeholder | Not a site plan; actual geometry and marker positions are unknown |
| LBS-02 | Initial systems map | Inline SVG / portfolio code | Working hypothesis | Dashed relationships are questions, not confirmed procedure |

## Adding artifacts made in other tools
1. Export the artifact in a web-friendly format.
2. Put the approved export under `public/images/field-study/` (or a project-specific subfolder).
3. Add a manifest entry with ID, title, caption, file path, source tool, creation/update date, status, evidence boundary, and permission/sanitization note.
4. Add the artifact to the artifact section in `app/projects/landscape-before-snow/page.tsx`.
5. Prefer SVG for diagrams and linework; PNG or WebP for rendered images and screenshots. Keep editable originals in the source platform or project archive.
6. Use descriptive alt text and captions. Label concepts, illustrative renderings, and untested prototypes.
7. Do not publish identifiable property information, operational details, or photographs without appropriate permission.

## Suggested status vocabulary
- Field record — direct observation, dated and contextualized.
- Reported — explanation from a person or source, not yet independently corroborated.
- Verified — corroborated with a source or repeated evidence.
- Schematic — explanatory drawing, not a measured site representation.
- Concept — proposed response, not implemented.
- Prototype — visual or interactive model, not necessarily tested.
- Evaluated — tested against a stated method; include findings and limitations.
