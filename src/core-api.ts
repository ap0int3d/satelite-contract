/**
 * Shapes exchanged between the core and a module's backend (contract §3, §4, §5).
 * Field names are those of the JSON on the wire, hence snake_case.
 */

/**
 * Audiences of the service tokens. A token minted for one direction is refused in the
 * other, and a user token can never be mistaken for either.
 */
export const MODULE_SERVICE_AUDIENCE = 'satelite:module'; // core -> module (`/internal/*`)
export const CORE_SERVICE_AUDIENCE = 'satelite:core'; // module -> core (`/core/*`)

// --- Module -> core -------------------------------------------------------------

/** `GET /core/connections?type=<type>` (§5.2): what a module needs to let a person pick one. */
export interface ConnectionListResponse {
  items: { connection_id: string; type: string; name: string }[];
}

/** `GET /core/connections/<id>` (§5.2): credentials, only when the module is about to act. */
export interface ConnectionCredentialsResponse {
  connection_id: string;
  type: string;
  name: string;
  credentials: Record<string, string | number | boolean>;
}

/** `POST /core/permissions/check` (§4.2). */
export interface PermissionCheckRequest {
  /** e.g. `dns:zone:read`; must belong to the calling module. */
  permission: string;
  /** The user token the core attached to the request it forwarded. */
  user_token: string;
}

export interface PermissionCheckResponse {
  granted: boolean;
  /** Empty means the permission is granted globally. */
  scopes: { type: string; [key: string]: unknown }[];
}

/** `POST /core/audit` (§7): omit `user_token` for actions performed by a scheduled task. */
export interface AuditRequest {
  action_code: string;
  target?: string;
  parameters?: Record<string, unknown>;
  before?: Record<string, unknown>;
  after?: Record<string, unknown>;
  user_token?: string;
}

// --- Core -> module -------------------------------------------------------------

/** `GET /internal/health` (§3.2): the module's own state, never the reachability of its targets. */
export interface InternalHealthResponse {
  status: 'ok' | 'error';
  /** Which module answers (§3.2): the core refuses a backend that answers as another. */
  module_code: string;
  module_version: string;
  schema_version: number;
  message?: string;
  /**
   * Optional (§3.2, §5.4): where the target exposes an expiry date for a credential, when it
   * expires, so that the core can warn before it lapses. Learnt at the last synchronisation:
   * health never asks the target.
   */
  connection_expiries?: {
    connection_id: string;
    /** When the credential stops working; `null` says it is known not to expire. Absent entry: unknown. */
    expires_at: string | null;
  }[];
}

/** `POST /internal/migrate` (§3.3). */
export interface InternalMigrateRequest {
  from_schema_version: number;
  to_schema_version: number;
}

export interface InternalMigrateResponse {
  status: 'ok' | 'error';
  schema_version: number;
  message?: string;
}

/** `POST /internal/sync` (§5.5): asynchronous, answered as soon as it is accepted. */
export interface InternalSyncRequest {
  connection_type: string;
  reason: 'connection_configured' | 'module_reenabled' | 'module_started';
}
