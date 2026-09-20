/**
 * What the shell hands to a module's root component (contract §8.2), and the
 * shapes a module delivers back.
 */

export interface ThemeTokens {
  /** The colour scheme currently displayed. Modules inherit the shell's theme by
   *  rendering inside it; this is for the rare case a module needs to know. */
  colorScheme: 'light' | 'dark';
}

export interface ShellContext {
  user: {
    id: string;
    displayName: string;
    /** Language currently displayed, e.g. `en-US` or `fr`. */
    language: string;
  };
  /** Permissions granted to the user for this module, e.g. `dns:zone:write`. */
  permissions: string[];
  navigate: (path: string) => void;
  theme: ThemeTokens;
}

/** The module's root component receives the shell context as its props. */
export type ModuleRootProps = ShellContext;

/**
 * Translations a module delivers with its bundle: language → key → text. They are
 * registered under the module's own namespace, named after its `code`.
 */
export type ModuleTranslations = Record<string, Record<string, string>>;

/** Lifecycle status of a change, displayed by the shell's `<StatusBadge>`. */
export type DraftStatus = 'draft' | 'applied' | 'drift_detected' | 'undetermined';
