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

  /** One side of a diff: a column heading, and what to say when that side holds nothing. */
  export interface DiffSide {
    label: string;
    /** Shown in place of a value the side does not have (e.g. "Did not exist"). */
    empty: string;
  }

  /** What one side holds for one row; `null` means it holds nothing. */
  export interface DiffValue {
    /** Displayed one per line, in a monospace font. Compared line by line between sides. */
    lines: string[];
    /** Secondary detail shown under the lines (e.g. "TTL 300"). Compared with the lines. */
    note?: string;
  }

  export interface DiffRow {
    id: string;
    /** What the row is about (a name, a field…), already translated by the caller. */
    label: import('react').ReactNode;
    /** One entry per side, in the same order as `sides`. */
    values: Array<DiffValue | null>;
  }

  export interface DiffViewProps {
    /** Two sides for a before/after diff, three for a known/current/proposed one. */
    sides: [DiffSide, DiffSide] | [DiffSide, DiffSide, DiffSide];
    /** Heading of the first column, the one that names each row. */
    rowHeading: string;
    rows: DiffRow[];
  }

  /**
   * Two-sided or three-sided diff. A value that differs from the first side's is tinted and
   * marked, so that a change is not carried by colour alone. The caller supplies every text.
   */
  export function DiffView(props: DiffViewProps): import('react').ReactElement;

}
