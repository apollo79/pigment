import { isFunction } from "@kobalte/utils";
import { createContext, mergeProps, useContext } from "solid-js";

import { Components } from "./components";

export interface Theme {
  components?: Components;
}

export const ThemeContext = createContext<Theme | undefined>();

function useComponentTheme<T extends keyof Components>(component: T) {
  return useContext(ThemeContext)?.components?.[component] ?? undefined;
}

/**
 * Resolve the `slotClasses` provided in the component theme configuration.
 */
export function useThemeClasses<Slots extends string>(
  component: keyof Components,
  props: any
): Record<Slots, string> {
  const classes = useComponentTheme(component)?.slotClasses ?? {};

  if (isFunction(classes)) {
    return classes(props);
  } else {
    return classes as Record<Slots, string>;
  }
}

/**
 * Merge default, theme and component props into a single props object.
 * @param component The name of the component to look for in the theme.
 * @param defaultProps The default props, will be overridden by theme and component props.
 * @param props The component `props` object.
 * @example
 * // mergedProps = defaultProps <== themeProps <== props
 */
export function mergeThemeProps<T extends Record<string, any>>(
  component: keyof Components,
  defaultProps: Partial<T>,
  props: T
): T {
  const themeProps = () => useComponentTheme(component)?.defaultProps ?? {};

  return mergeProps(defaultProps, themeProps, props);
}
