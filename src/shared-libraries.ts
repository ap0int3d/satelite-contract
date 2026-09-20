/**
 * Libraries the shell and every module must share as a single running instance
 * (specification §5.2: one framework for the whole page). Modules declare them as
 * shared singletons and never bundle their own copy (contract §8.1).
 *
 * The shell provides them; a module built against a range that the shell does not
 * satisfy fails to load with an explicit message instead of misbehaving.
 *
 * Sharing more than React matters: the Mantine components a module renders read
 * the theme from a context created by the shell, the router context comes from the
 * shell's router, and translations go through the shell's i18n instance. Each of
 * these would silently break if the module carried its own copy.
 */
export const SHARED_LIBRARIES: Readonly<Record<string, string>> = {
  react: '^19.0.0',
  'react-dom': '^19.0.0',
  // What the JSX transform imports: without these a module would carry its own
  // copy of the runtime, which in a development build pulls in its own React too.
  'react/jsx-runtime': '^19.0.0',
  'react/jsx-dev-runtime': '^19.0.0',
  '@mantine/core': '^9.0.0',
  '@mantine/hooks': '^9.0.0',
  'react-router': '^8.0.0',
  i18next: '^26.0.0',
  'react-i18next': '^17.0.0',
};

/**
 * The shell's shared components (`<StatusBadge>`, ...), provided at runtime under
 * this name. Version of that API, independent from the contract version; modules
 * accept the same major version.
 */
export const SHELL_UI_LIBRARY = '@satelite/shell-ui';
export const SHELL_UI_VERSION = '1.0.0';
