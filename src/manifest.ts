/**
 * Shape of a module's `manifest.json` (contract §2.1). The field names are those
 * of the JSON file, hence snake_case.
 */

export interface DeclaredPermission {
  resource_type: string;
  action: string;
  label_key: string;
  /** Name of a scope shape declared in `scope_types`. Omitted for always-global permissions. */
  scope_type?: string;
}

export interface ScopeType {
  type: string;
  label_key: string;
  value_shape: 'id_list' | 'string_value';
  selector: 'flat_list' | 'tree' | 'free_text';
}

export interface CredentialField {
  type: 'string' | 'integer' | 'boolean' | 'enum' | 'certificate_pem' | 'private_key_pem';
  /** Allowed values, required for `enum`. */
  values?: { value: string; label_key: string }[];
  default?: unknown;
  /** `true`: stored in the secret manager, write-only, never returned to any UI or API. */
  secret: boolean;
  label_key: string;
  help_key?: string;
  widget?: 'single_line' | 'multiline' | 'password' | 'file';
  required?: boolean;
}

export interface RequiredConnectionType {
  type: string;
  label_key: string;
  optional?: boolean;
  credential_schema: Record<string, CredentialField>;
}

/** What a module suggests about deploying its backend: hints for the administrator, nothing binding. */
export interface BackendHints {
  /** Port the backend listens on by default. */
  default_port: number;
  /** Container image reference, when the author publishes one. Informative. */
  image?: string;
}

export interface ScheduledTaskDeclaration {
  code: string;
  label_key: string;
  /** ISO 8601 duration, e.g. `PT15M`. Fixed by the module. */
  frequency: string;
  /** Always under `/internal/tasks/`. */
  endpoint: string;
  requires_connection_types?: string[];
}

export interface ModuleManifest {
  /** Stable unique identifier; namespaces permissions, audit codes and translation keys. */
  code: string;
  /** Plain-text display name, the fallback whenever translations are unavailable. */
  name: string;
  name_key?: string;
  version: string;
  contract_version: string;
  schema_version: number;
  menu_entry: { label_key: string; icon: string };
  /** Must include `en-US`, the reference language. */
  supported_languages: string[];
  declared_permissions: DeclaredPermission[];
  scope_types?: ScopeType[];
  required_connection_types?: RequiredConnectionType[];
  scheduled_tasks?: ScheduledTaskDeclaration[];
  /**
   * Present when the module has a backend of its own (contract §1.0); absent for a module that
   * is an interface alone. The address is never here: the administrator registers it.
   */
  backend?: BackendHints;
  repository_url?: string;
  translation_contribution_url?: string;
}
