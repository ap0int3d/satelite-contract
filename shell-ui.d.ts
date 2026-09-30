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

  export interface AuditTrailProps {
    /** Code of the module whose events are shown; also the namespace that words its actions. */
    module: string;
    /**
     * The entity whose history is shown. An event belongs to it when its `target` is this
     * value, or when it carries this value as its `entity` parameter (for events whose target
     * is something finer, such as a record within a zone).
     */
    entity: string;
    /** Change it to reload the history, e.g. after an action that adds to it. */
    refreshKey?: string | number;
  }

  /**
   * History of one entity, most recent first, translated at display time, with what changed
   * shown as a diff. Open to whoever can use the module; the full journal stays with administrators.
   */
  export function AuditTrail(props: AuditTrailProps): import('react').ReactElement;

  export interface NotificationsProps {
    /** Show only this module's notifications (its `code`); all the person may see when omitted. */
    module?: string;
  }

  /**
   * The in-app notification surface: a bell with the number of unread notifications and their
   * list. A notification is a structured event worded at display time, leads to the screen
   * concerned, and is read per user. The shell shows one in its header for every notification;
   * a module never builds its own surface, and may embed a filtered one where it helps.
   */
  export function Notifications(props: NotificationsProps): import('react').ReactElement;
}
