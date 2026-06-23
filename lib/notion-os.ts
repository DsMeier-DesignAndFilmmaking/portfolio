/**
 * Environmental Systems Design OS — read-only Notion data layer.
 *
 * Dedicated to the OS portfolio page. Separate from lib/api/notion.js (a mock).
 *
 * IMPORTANT (static export):
 *   The portfolio is built with `output: 'export'`. These functions run at BUILD
 *   time inside an async server component, so NOTION_API_KEY never reaches the
 *   browser. Data is baked into the static HTML at build time (no ISR/revalidate).
 *
 * The SDK (@notionhq/client v5) defaults to the 2025-09-03 data-source API, but
 * the provided IDs are classic database IDs — so the client is pinned to the
 * classic `2022-06-28` API version, where `databases.query({ database_id })` and
 * property-based filters/sorts behave as expected.
 *
 * Every exported function is wrapped in try/catch and returns [] on failure so
 * the page always renders.
 */

import { Client } from '@notionhq/client';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
  notionVersion: '2022-06-28',
});

// ── Database IDs ────────────────────────────────────────────────────────────
const DB = {
  organizations: '3d58ea50-5593-4fac-a3f6-2b1cb0d882eb',
  systemArtifacts: 'f4ebb36a-5d2f-4586-a511-370156d1d9b8',
  experiencePatterns: 'a17d85b2-7afd-41ff-8902-6256fe94f385',
  projects: '15850fbe-b755-4cf7-9f58-2a4dd38b9e44',
  portfolioAssets: 'b1fc6b8d-6080-4a83-8c43-fffc923de4db',
} as const;

// ── Return-type interfaces ──────────────────────────────────────────────────
export interface StudiedOrganization {
  name: string;
  orgType: string;
  systemsLayers: string[];
  strategicRelevance: number;
  status: string;
}

export interface SystemArtifact {
  name: string;
  artifactType: string;
  status: string;
  maturity: string;
  evidenceConfidence: string;
  version: string;
  project: string;
}

export interface ExperiencePattern {
  name: string;
  valueIntent: string;
  systemsLayers: string[];
  strategicRelevance: number;
  maturity: string;
}

export interface OsProject {
  name: string;
  pitch: string;
  workType: string;
  maturityStage: string;
  systemsLayers: string[];
  portfolioPriority: string;
  externalLink: string;
  status: string;
}

export interface PortfolioAsset {
  name: string;
  assetType: string;
  portfolioSection: string;
  evidenceRole: string;
  status: string;
  portfolioReady: boolean;
  strategicRelevance: number;
}

// ── Minimal Notion shapes (avoids `any` without deep SDK type imports) ───────
interface NotionRichText {
  plain_text: string;
}
interface NotionNamedOption {
  name: string;
}
interface NotionPropertyValue {
  type: string;
  title?: NotionRichText[];
  rich_text?: NotionRichText[];
  select?: NotionNamedOption | null;
  multi_select?: NotionNamedOption[];
  status?: NotionNamedOption | null;
  checkbox?: boolean;
  number?: number | null;
  url?: string | null;
  relation?: { id: string }[];
}
interface NotionPage {
  id: string;
  properties: Record<string, NotionPropertyValue>;
}

// ── Property readers ─────────────────────────────────────────────────────────
const titleText = (p?: NotionPropertyValue): string =>
  (p?.title ?? []).map((t) => t.plain_text).join('').trim();
const richText = (p?: NotionPropertyValue): string =>
  (p?.rich_text ?? []).map((t) => t.plain_text).join('').trim();
const selectName = (p?: NotionPropertyValue): string => p?.select?.name ?? '';
const statusName = (p?: NotionPropertyValue): string => p?.status?.name ?? '';
const multiNames = (p?: NotionPropertyValue): string[] =>
  (p?.multi_select ?? []).map((o) => o.name);
const numberVal = (p?: NotionPropertyValue): number => p?.number ?? 0;
const urlVal = (p?: NotionPropertyValue): string => p?.url ?? '';
const checkboxVal = (p?: NotionPropertyValue): boolean => p?.checkbox ?? false;
const relationIds = (p?: NotionPropertyValue): string[] =>
  (p?.relation ?? []).map((r) => r.id);
const toInt = (s: string): number => {
  const n = parseInt(s, 10);
  return Number.isNaN(n) ? 0 : n;
};
const truncate = (s: string, max: number): string =>
  s.length > max ? `${s.slice(0, max).trimEnd()}…` : s;

// ── Query helpers ────────────────────────────────────────────────────────────
type QueryBody = {
  filter?: Record<string, unknown>;
  sorts?: { property: string; direction: 'ascending' | 'descending' }[];
};

type QueryParams = Parameters<typeof notion.databases.query>[0];

async function queryAll(databaseId: string, body: QueryBody = {}): Promise<NotionPage[]> {
  const pages: NotionPage[] = [];
  let cursor: string | undefined;
  do {
    const params = {
      database_id: databaseId,
      start_cursor: cursor,
      page_size: 100,
      ...body,
    } as unknown as QueryParams;
    const res = await notion.databases.query(params);
    pages.push(...(res.results as unknown as NotionPage[]));
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);
  return pages;
}

// Resolve a relation's first related page title (cached across a single build).
const relationTitleCache = new Map<string, string>();
async function firstRelationTitle(ids: string[]): Promise<string> {
  const id = ids[0];
  if (!id) return '';
  const cached = relationTitleCache.get(id);
  if (cached !== undefined) return cached;
  try {
    const page = (await notion.pages.retrieve({ page_id: id })) as unknown as NotionPage;
    const titleProp = Object.values(page.properties).find((prop) => prop.type === 'title');
    const title = titleText(titleProp);
    relationTitleCache.set(id, title);
    return title;
  } catch {
    relationTitleCache.set(id, '');
    return '';
  }
}

// Build a categorical rank comparator (lower rank sorts first; unknowns last).
const rankOf = (value: string, order: string[]): number => {
  const i = order.indexOf(value);
  return i === -1 ? order.length : i;
};

// ── Function 1: Studied Organizations ────────────────────────────────────────
export async function getStudiedOrganizations(): Promise<StudiedOrganization[]> {
  try {
    const pages = await queryAll(DB.organizations, {
      filter: { property: 'Status', select: { equals: 'Actively Studying' } },
    });

    const rows: StudiedOrganization[] = pages.map((page) => ({
      name: titleText(page.properties['Organization']),
      orgType: selectName(page.properties['Organization Type']),
      systemsLayers: multiNames(page.properties['Systems Layers']),
      strategicRelevance: toInt(selectName(page.properties['Strategic Relevance'])),
      status: selectName(page.properties['Status']),
    }));

    // Strategic Relevance desc, then Organization name asc.
    rows.sort(
      (a, b) =>
        b.strategicRelevance - a.strategicRelevance || a.name.localeCompare(b.name),
    );
    return rows;
  } catch (err) {
    console.error('getStudiedOrganizations failed:', err);
    return [];
  }
}

// ── Function 2: System Artifacts ─────────────────────────────────────────────
const ARTIFACT_MATURITY_ORDER = ['Portfolio Candidate', 'Validated', 'Tested', 'Structured', 'Concept'];

export async function getSystemArtifacts(): Promise<SystemArtifact[]> {
  try {
    const pages = await queryAll(DB.systemArtifacts);

    const rows: SystemArtifact[] = await Promise.all(
      pages.map(async (page) => ({
        name: titleText(page.properties['Artifact']),
        artifactType: selectName(page.properties['Artifact Type']),
        status: statusName(page.properties['Status']),
        maturity: selectName(page.properties['Maturity']),
        evidenceConfidence: selectName(page.properties['Evidence Confidence']),
        version: richText(page.properties['Version']),
        project: await firstRelationTitle(relationIds(page.properties['Project'])),
      })),
    );

    // Maturity (Portfolio Candidate first), then Artifact name asc.
    rows.sort(
      (a, b) =>
        rankOf(a.maturity, ARTIFACT_MATURITY_ORDER) -
          rankOf(b.maturity, ARTIFACT_MATURITY_ORDER) || a.name.localeCompare(b.name),
    );
    return rows;
  } catch (err) {
    console.error('getSystemArtifacts failed:', err);
    return [];
  }
}

// ── Function 3: Experience Patterns ──────────────────────────────────────────
const PATTERN_MATURITY_ORDER = ['Validated', 'Evidence Building', 'Drafted', 'Candidate'];

export async function getExperiencePatterns(): Promise<ExperiencePattern[]> {
  try {
    // "Strategic Relevance" is a select ("1".."5"); >= 4 expressed as equals 4 OR 5.
    const pages = await queryAll(DB.experiencePatterns, {
      filter: {
        and: [
          {
            or: [
              { property: 'Strategic Relevance', select: { equals: '4' } },
              { property: 'Strategic Relevance', select: { equals: '5' } },
            ],
          },
          { property: 'Maturity', select: { does_not_equal: 'Archived' } },
        ],
      },
    });

    const rows: ExperiencePattern[] = pages.map((page) => ({
      name: titleText(page.properties['Experience Pattern']),
      valueIntent: truncate(richText(page.properties['Value Focus / Structural Intent']), 120),
      systemsLayers: multiNames(page.properties['Systems Layers']),
      strategicRelevance: toInt(selectName(page.properties['Strategic Relevance'])),
      maturity: selectName(page.properties['Maturity']),
    }));

    // Strategic Relevance desc, then Maturity (Validated first).
    rows.sort(
      (a, b) =>
        b.strategicRelevance - a.strategicRelevance ||
        rankOf(a.maturity, PATTERN_MATURITY_ORDER) - rankOf(b.maturity, PATTERN_MATURITY_ORDER),
    );
    return rows;
  } catch (err) {
    console.error('getExperiencePatterns failed:', err);
    return [];
  }
}

// ── Function 4: Projects & Concepts ──────────────────────────────────────────
const PROJECT_PRIORITY_ORDER = ['High', 'Medium', 'Low'];
const PROJECT_STRATEGIC_RELEVANCE_PROP = 'Strategic Relevance (1–5)'; // en-dash, exact match

export async function getProjects(): Promise<OsProject[]> {
  try {
    const pages = await queryAll(DB.projects, {
      filter: {
        or: [
          { property: 'Status', status: { equals: 'Active' } },
          { property: 'Status', status: { equals: 'Completed' } },
          { property: 'Status', status: { equals: 'Published (Portfolio)' } },
        ],
      },
    });

    const rows: OsProject[] = pages.map((page) => ({
      name: titleText(page.properties['Project / Concept']),
      pitch: richText(page.properties['One-Line Pitch']),
      workType: selectName(page.properties['Work Type']),
      maturityStage: selectName(page.properties['Maturity Stage']),
      systemsLayers: multiNames(page.properties['Systems Layers']),
      portfolioPriority: selectName(page.properties['Portfolio Priority']),
      externalLink: urlVal(page.properties['External Link']),
      status: statusName(page.properties['Status']),
    }));

    // Portfolio Priority (High first), then Strategic Relevance desc.
    const relevanceOf = (page: NotionPage) =>
      toInt(selectName(page.properties[PROJECT_STRATEGIC_RELEVANCE_PROP]));
    const relevanceByName = new Map(pages.map((p) => [titleText(p.properties['Project / Concept']), relevanceOf(p)]));

    rows.sort(
      (a, b) =>
        rankOf(a.portfolioPriority, PROJECT_PRIORITY_ORDER) -
          rankOf(b.portfolioPriority, PROJECT_PRIORITY_ORDER) ||
        (relevanceByName.get(b.name) ?? 0) - (relevanceByName.get(a.name) ?? 0),
    );
    return rows;
  } catch (err) {
    console.error('getProjects failed:', err);
    return [];
  }
}

// ── Function 5: Portfolio Assets ─────────────────────────────────────────────
const ASSET_STATUS_ORDER = ['Published', 'Ready for Portfolio', 'Review', 'In Progress', 'Draft', 'Archived'];

export async function getPortfolioAssets(): Promise<PortfolioAsset[]> {
  try {
    const pages = await queryAll(DB.portfolioAssets, {
      filter: { property: 'Portfolio Ready', checkbox: { equals: true } },
    });

    const rows: PortfolioAsset[] = pages.map((page) => ({
      name: titleText(page.properties['Title']),
      assetType: selectName(page.properties['Asset Type']),
      portfolioSection: selectName(page.properties['Portfolio Section']),
      evidenceRole: selectName(page.properties['Evidence Role']),
      status: selectName(page.properties['Status']),
      portfolioReady: checkboxVal(page.properties['Portfolio Ready']),
      strategicRelevance: numberVal(page.properties['Strategic Relevance']),
    }));

    // Status (Published first), then Strategic Relevance desc.
    rows.sort(
      (a, b) =>
        rankOf(a.status, ASSET_STATUS_ORDER) - rankOf(b.status, ASSET_STATUS_ORDER) ||
        b.strategicRelevance - a.strategicRelevance,
    );
    return rows;
  } catch (err) {
    console.error('getPortfolioAssets failed:', err);
    return [];
  }
}
