export type FlattenObjectKeys<T extends Record<string, unknown>, Key = keyof T> = Key extends string
  ? T[Key] extends Record<string, unknown>
    ? `${Key}.${FlattenObjectKeys<T[Key]>}`
    : `${Key}`
  : never;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const themeTokensShapeValue = {
  colors: {
    content: {
      DEFAULT: "",
      subtle: "",
      subtler: "",
      subtlest: "",
      disabled: "",
      link: "",

      primary: "",
      success: "",
      info: "",
      warning: "",
      danger: "",
      discovery: "",

      onPrimary: "",
      onNeutral: "",
      onSuccess: "",
      onInfo: "",
      onWarning: "",
      onDanger: "",
      onDiscovery: "",

      onPrimarySubtle: "",
      onNeutralSubtle: "",
      onSuccessSubtle: "",
      onInfoSubtle: "",
      onWarningSubtle: "",
      onDangerSubtle: "",
      onDiscoverySubtle: "",
    },

    surface: {
      DEFAULT: "",
      body: "",
      overlay: "",
      disabled: "",
      tooltip: "",

      subtle: {
        DEFAULT: "",
        hover: "",
        active: "",
      },

      primary: {
        DEFAULT: "",
        hover: "",
        active: "",
        subtle: {
          DEFAULT: "",
          hover: "",
          active: "",
        },
      },
      neutral: {
        DEFAULT: "",
        hover: "",
        active: "",
        subtle: "",
      },
      success: {
        DEFAULT: "",
        hover: "",
        active: "",
        subtle: "",
      },
      info: {
        DEFAULT: "",
        hover: "",
        active: "",
        subtle: "",
      },
      warning: {
        DEFAULT: "",
        hover: "",
        active: "",
        subtle: "",
      },
      danger: {
        DEFAULT: "",
        hover: "",
        active: "",
        subtle: "",
      },
      discovery: {
        DEFAULT: "",
        hover: "",
        active: "",
        subtle: "",
      },
    },

    line: {
      DEFAULT: "",
      disabled: "",
      primary: "",
      neutral: "",
      success: "",
      info: "",
      warning: "",
      danger: "",
      discovery: "",
    },

    ring: "",
  },
};

export type ColorSchemeTokens = Pick<typeof themeTokensShapeValue, "colors">;

export interface ThemeTokens {
  /** Light mode specific tokens. */
  light: ColorSchemeTokens;

  /** Dark mode specific tokens. */
  dark: DeepPartial<ColorSchemeTokens>;
}

export type PartialThemeTokens = DeepPartial<ThemeTokens>;

export type TokenKey = FlattenObjectKeys<ColorSchemeTokens>;

/** A function to get the css variable of a token. */
export type VarsFn = (token: TokenKey) => string;

export type PredefinedTheme = "blue";

export interface ExtendedTheme {
  /** The name of the extended theme. */
  name: string;

  /** The predefined theme to extend. */
  extend: PredefinedTheme;

  /** The design tokens of the extended theme. */
  tokens: PartialThemeTokens;
}

export interface CustomTheme {
  /** The name of the custom theme. */
  name: string;

  /** The design tokens of the custom theme. */
  tokens: ThemeTokens;
}

export interface PigmentOptions {
  /** The prefix to use in the generated css variables. */
  cssVarPrefix?: string;

  /** The themes available in the application. */
  themes?: Array<PredefinedTheme | ExtendedTheme | CustomTheme>;
}
