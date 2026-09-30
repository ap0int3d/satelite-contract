/**
 * Wire shape of `GET /api/modules/<code>/search` (contract §4.5). Each module answering
 * this route resolves `title`/`subtitle` to plain display text itself; the shell never
 * looks up the underlying record.
 */

export interface ModuleSearchResult {
  /** Matches a `entity_type` declared in the module's `search_capabilities`. */
  entity_type: string;
  id: string;
  title: string;
  subtitle?: string;
  /** Path inside this module's own route space, e.g. `/dns/zones/<id>` (contract §7.1 `link` rule). */
  link: string;
}

export interface ModuleSearchResponse {
  results: ModuleSearchResult[];
  /** True when more than the requested `limit` matched. */
  truncated: boolean;
}
