/**
 * Types of the components the shell provides to modules at runtime (contract §8.3).
 *
 * Modules import them as `@satelite/shell-ui` and declare that name as a shared
 * library that is provided, not bundled. This file only describes them: the code
 * comes from the shell. Reference it from a module's TypeScript configuration:
 *
 *   "types": ["@satelite/contract/shell-ui"]
 *
 * It deliberately has no top-level import or export, so that it stays a global
 * declaration file.
 */
declare module '@satelite/shell-ui' {
  export interface StatusBadgeProps {
    status: import('@satelite/contract').DraftStatus;
  }

  /** Draft / applied / drift detected / undetermined, drawn and translated by the shell. */
  export function StatusBadge(props: StatusBadgeProps): import('react').ReactElement;
}
